import React, {Component} from 'react';
import { StyleSheet, View, TouchableOpacity, Image, FlatList, ActionSheetIOS, ImageBackground, ActivityIndicator } from 'react-native';
import { Icon, ImagePicker, Permissions  } from 'expo';
import { AvenirText } from '../text/StyledText';
import Colors from '../../constants/Colors';
import Layout from '../../constants/Layout';
import { SearchBar } from 'react-native-elements';
import { AnimatedModal } from '../modal';

import Styles from '../../constants/Styles';
import { connect } from 'react-redux';
import Unsplash, { toJson } from 'unsplash-js/native';

const unsplash = new Unsplash({
    applicationId: "245c2d42d1b7ed4a5218218adff67cedcf43250ba433f7781c1f11ce38584d09",
    secret: "2a8f8ed31312cc389518401f780a9a7bd6b334cb83d8dc7114169567d6ff0c63"
});

class CustomImagePicker extends Component {
    constructor(props){
        super(props);

        this.state = {
            modalVisible: false,
            searchText: null,
            selectedImage: this.props.value || null
        };
    }

    _setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }

    _onChange= (image) => {
        if(this.props.onChange){
            this.props.onChange(image);
        }
    }

    _launchImageLibrary = async (isCameraLaunching) => {
        let image = null;
        let isGranted = true;
        let permissionName = isCameraLaunching ? Permissions.CAMERA : Permissions.CAMERA_ROLL;

        const permission = await Permissions.getAsync(permissionName);
        if (permission.status !== 'granted') {
            isGranted = false;
            const newPermission = await Permissions.askAsync(permissionName);
            if (newPermission.status === 'granted') {
                isGranted = true;
            }
        }
        
        if (isGranted){
            if (isCameraLaunching) {
                image = await ImagePicker.launchCameraAsync();
            } else {
                image = await ImagePicker.launchImageLibraryAsync();
            }
            if (image && image.cancelled == false){
                this.setState({ selectedImage : image.uri });
                this._onChange(image.uri);
            }
        }
    }

    _openImagePicker = async () => {
        if(this.props.disabled) return ;
        
        let _this = this;

        let options = ['Cancel', 'Search from internet','From image library', 'Capture by camera'];
        
        option = {
            title : 'Add image',
            message : 'Select a image from internet or from your photo library',
            options: options,
            cancelButtonIndex: 0,
        }
        if(this.state.selectedImage){
            options.push('Remove');
            option.destructiveButtonIndex = 4;
        }
        ActionSheetIOS.showActionSheetWithOptions(option, async (buttonIndex) => {
            switch(buttonIndex){
                case 1:
                    _this.setState({ modalVisible : true})
                     break;
                case 2:
                    _this._launchImageLibrary();
                case 3:
                    _this._launchImageLibrary(true);
                case 4: 
                    _this.setState({selectedImage: null, modalVisible: false });
                    this._onChange(null);
            }
        });
    }


    _renderSelectedImage = () => {
        if(this.state.selectedImage){

            return (
                <TouchableOpacity style={styles.buttonToggle} onPress={this._openImagePicker}>
                    <ImageBackground source={{ uri: this.state.selectedImage }} style={styles.imageContainer}>
                    </ImageBackground>
                </TouchableOpacity>
            )
        }

        return (
            <TouchableOpacity style={styles.buttonToggle} onPress={this._openImagePicker}>
                <Icon.Ionicons style={styles.toggleIcon} name="md-image" size={Styles.inputIconSize}/>
                <AvenirText style={styles.buttonLabel}>{this.props.placeholder || 'Select a image'}</AvenirText>
            </TouchableOpacity>
        )
    }

    photoPageSize = 20;
    _getPhotos = (text) => {
        let that = this;
        this.setState({loading: true});
        unsplash.search.photos(text, 1, this.photoPageSize)
            .then(toJson)
            .then(json => {
                that.setState({ loading : false, photos: json.results, searchText: text, currentPage: 1, totalPages: json.total_pages});
            });
    }

    _loadMorePhotos = () => {
        let that = this;
        let nextPage = this.state.currentPage + 1;
        this.setState({loadingPhoto: true});
        unsplash.search.photos(this.state.searchText, nextPage, this.photoPageSize)
            .then(toJson)
            .then(json => {
                that.setState({ loadingPhoto: false, photos: [...that.state.photos ,...json.results], currentPage: nextPage});
            });
    }

    _renderHeader = () => {
        return (
            <SearchBar
                placeholder="Enter a keyword..."
                lightTheme
                autoCorrect={true}
                autoFocus={true}
                returnKeyType='search'
                containerStyle={{ backgroundColor: 'transparent', borderColor: 'transparent' }}
                inputStyle={{ backgroundColor: 'transparent', borderColor: 'transparent' }}
                onSubmitEditing={(event) => {
                    this._getPhotos(event.nativeEvent.text);
                }}
            />
        );
    };

    _doneButton = () => {
        this.setState({ modalVisible: false })
    }

    render() {
        return (
            <View style={{position: 'relative'}}>
                {this._renderSelectedImage()}
                {
                    !this.props.disabled && this.state.modalVisible &&
                    (
                        <AnimatedModal
                            title="Search images" 
                            searchInputComponent={this._renderHeader}
                            visible={this.state.modalVisible}
                            onDonePress={this._doneButton}
                            onHideModal={this._doneButton}
                            contentContainerStyle={{backgroundColor: '#fff'}}
                        >
                            <View style={styles.contentContainer}>
                                {   
                                    this.state.loading ? 
                                    (
                                        <ActivityIndicator size="large" />
                                    ) : (
                                    <FlatList
                                        data={this.state.photos}
                                        style={{overflow: 'visible'}}
                                        keyExtractor={(item, index) => 'images_'+ index}
                                        renderItem={({ item, index }) => {
                                            return (
                                                <TouchableOpacity style={styles.imageRow} onPress={() => { this.setState({ selectedImage: item.urls.small }); this._onChange(item.urls.small ); this._doneButton(); }}>
                                                    <ImageBackground source={{ uri: item.urls.small }} style={styles.imageContainer}>
                                                        <AvenirText style={styles.imageTitle}>Photo by {item.user.name} on Unsplash</AvenirText>
                                                    </ImageBackground>
                                                </TouchableOpacity>
                                            )
                                        }}
                                        ListEmptyComponent = {
                                            ()=> (
                                                <View style={styles.emptyMessage}>
                                                    <Icon.MaterialCommunityIcons name="image-filter-center-focus-weak" size={120} style={styles.emptyIcon}/>
                                                    <AvenirText style={styles.emptyText} numberOfLines={2}>Try to search images by keywords: Japan, Street, Travel,...</AvenirText>
                                                </View>
                                            )
                                        }
                                        ListFooterComponent={() => this.state.photos ? (
                                            <TouchableOpacity 
                                                onPress={this._loadMorePhotos} 
                                                style={styles.loadMoreButton}
                                            >
                                                <AvenirText style={{color: '#Fff'}}>Load more</AvenirText> 
                                                {this.state.loadingPhoto ? (
                                                    <ActivityIndicator color="white" style={{ marginLeft: 8 }} />
                                                ) : null}
                                            </TouchableOpacity>
                                            ) : <View></View>
                                        }
                                        />
                                    
                                    )}
                            </View>
                        </AnimatedModal>
                    )
                }
                
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        transactions: state.transactions,
    }
};
export default connect(mapStateToProps, null)(CustomImagePicker);

const styles = StyleSheet.create({
    buttonToggle:{
        alignItems: 'center',
        flexDirection: 'row',
        paddingVertical: 10
    },
    buttonLabel: {
        textAlign: 'center',
        marginTop: 3,
        marginLeft: 10
    },
    toggleIcon:{
        color: Colors.textGray,
        width: 25,
        textAlign: 'center'
    },
    content: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0, 
        paddingTop: 92,
        backgroundColor: '#fff',
        borderTopRightRadius: 15,
        borderTopLeftRadius: 15,
        overflow: 'hidden'
    },
    contentContainer:{
        marginTop: 92,
        paddingBottom: Layout.bottomOffset,
    },
    imageRow:{
        margin: 10,
        marginHorizontal: 15
    },
    imageContainer: { 
        width: '100%', 
        height: 150,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        overflow: 'hidden',
    },
    imageTitle:{
        color: '#fff'
    },
    loadMoreButton: {
        marginHorizontal: 15,
        marginTop: 10,
        padding: 10,
        backgroundColor: Colors.mainColor,
        borderRadius: 4,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyMessage:{
        alignItems: 'center',
        height: 400,
        paddingLeft: 50,
        paddingRight: 50
    },
    emptyIcon:{
        color: Colors.textGray
    },
    emptyText:{
        color: Colors.textGray,
        textAlign: 'center'
    }
  });