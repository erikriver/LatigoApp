import React, { Component} from 'react';
import {TextInput, StyleSheet, View, KeyboardAvoidingView, TouchableOpacity, FlatList, Image, Platform} from 'react-native';
import { Constants, Permissions, Location, Icon} from 'expo';
import MapView, { AnimatedRegion, Animated  } from 'react-native-maps';
import { getAutocomplete, getLocationDetail, getNearLocations } from '../../utils/googleMapHelper';
import { AvenirText } from '../text/StyledText';
import Collapsible from 'react-native-collapsible';
import Colors from '../../constants/Colors';
import Layout from '../../constants/Layout';
import { AnimatedModal } from '../modal';
import Styles from '../../constants/Styles';

export class LocationPicker extends Component {
    _results = [];
    _requests = [];

    constructor(props){
        super(props);

        this.state = {
            value: this.props.value || {},
            modalVisible: false,
            searchText: null,
            location: {
                latitude: 0,
                longitude: 0,
            },
            nearlocationCollapse: false,
            selectedItem: {},
            showSuggestion: false,
            region: new AnimatedRegion({
                    latitude:       0.01,
                    longitude:      0.01,
                    latitudeDelta:  0.01,
                    longitudeDelta: 0.01,
            })
        };
    }
    componentWillReceiveProps(newProps){
        // if(newProps.value.place_id != this.state.value.place_id){
        //     this.setState({value: newProps.value});
        // }
    }

    componentWillMount() {
        if (Platform.OS === 'android' && !Constants.isDevice) {
            this.setState({
                errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
            });
        } else {
            this._getCurrentLocationAsync();
        }
    }


    _setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }

    //Get current location
    _getCurrentLocationAsync = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            this.setState({
                errorMessage: 'Permission to access location was denied',
            });
        }
        
        let location = await Location.getCurrentPositionAsync({});
        this._setMarker(location.coords.latitude, location.coords.longitude);
        this._getNearLocations(location.coords.latitude, location.coords.longitude);
    };

    _setMarker = (lat, lng)=>{
        let LatLng = {
            latitude: lat,
            longitude: lng
        }
        this.setState({
            location: LatLng,
        });
        this.state.region.timing(LatLng).start();
    }

    _backButtonEvent =() =>{
        if(this.state.showCustom){
            this.setState({showCustom: false});
        }else{
            this.setState({modalVisible: false});
        }
    }
    //NEARLY LOCATIONS
    _locationClick = (item)=>{
        this.setState({selectedItem: item, searchText: item.name});
        if (item.geometry && item.geometry.location) {
            this._setMarker(item.geometry.location.lat, item.geometry.location.lng);
        }
    }

    _renderChecked = (item)=>{
        if(item.id == this.state.selectedItem.id){
            return (
                <Icon.MaterialCommunityIcons style={styles.checkedIcon} size={24} name="checkbox-marked-circle"/>
            )
        }else{
            return (
                <Icon.MaterialCommunityIcons style={styles.checkedIcon} size={24} name="checkbox-blank-circle-outline"/>
            )
        }
    }

    _renderIcon = (item) => {
        if (item.icon) {
            return (
                <View style={styles.avatarContainer}>
                    <Image style={styles.avatar} source={{ uri: item.icon}} />
                </View>
            )
        } 
    }

    _renderLocation = ({item}) => {
        return (
            <TouchableOpacity onPress={()=>{this._locationClick(item)}} style={styles.card}>
                {this._renderIcon(item)}
                <View style={styles.locationContent}>
                    <AvenirText style={styles.locationName} weight="demi">{item.name}</AvenirText>
                    <AvenirText style={styles.locationAddress}>{item.vicinity}</AvenirText>
                </View>
                {this._renderChecked(item)}
            </TouchableOpacity>
        )
    }

    _getNearLocations = (lat, lng, keywords=null, isLoadMore=false)=>{
        this.setState({
            searchCondition: {
            lat: lat,
            lng: lat,
            keywords:keywords
        }});

        getNearLocations(lat, lng, keywords, isLoadMore?this.state.nextPagetoken: null, (response)=>{
            if(!isLoadMore){
                this.setState({
                    locations: response.results,
                    nextPagetoken: response.next_page_token
                });
                if(!this.nearlocationCollapse && this.locationList){
                    setTimeout(() => this.locationList.scrollToIndex({index: 0, animated: true}), 200);
                }
            }else{
                this.setState({
                    locations: this.state.locations.concat(response.results),
                    nextPagetoken: response.next_page_token
                })
            }
           
        })
    }

    _loadMore = () =>{
        if(this.state.nextPagetoken){
            const searchCondition = this.state.searchCondition;
            this._getNearLocations(searchCondition.lat, searchCondition.lng, searchCondition.name, true);
        }
    }

    //AUTOCOMPLETE INPUT
    _autocompleteInput = (text) => {
        getAutocomplete(text, (result)=>{
            this.setState({ suggestionLocations: result, showSuggestion: true});
        })
    }
    
    _getLocationDetail = (item) => {
        this.setState({searchText: item.description, nearlocationCollapse: true, showSuggestion: false, suggestionLocations:[]});
        //Reset list
        getLocationDetail(item.place_id, (response)=>{
            if (response.result.geometry && response.result.geometry.location){
                let location = response.result.geometry.location;
                this._getNearLocations(location.lat, location.lng, location.name);
                this.setState({selectedItem: response.result});
                this._setMarker(location.lat, location.lng);
            }
        })
    }


    _renderSuggestion = ({ item }) =>{
        return (
            <TouchableOpacity style={{ padding: 10 }} onPress={() => { this._getLocationDetail(item)}}>
                <AvenirText>{item.description}</AvenirText>
            </TouchableOpacity>
        )
    }

    //Custom search input component
    _searchInputComponent = () => {
        return (
            <View style={{flex:1}}>
                <TextInput
                    ref={(input) => this.searchInput = input}
                    placeholder="Restaurant, Cafee Shop, Address,..."
                    autoCorrect={false}
                    clearTextOnFocus={true}
                    style={{ backgroundColor: 'rgba(255,255,255,.9)', paddingTop: 15, paddingLeft: 30, paddingBottom: 15, height: 'auto', }} 
                    onChangeText={this._autocompleteInput} 
                    defaultValue={this.state.searchText}
                    textContentType="streetAddressLine1"
                    onFocus={() => { this.setState({ showSuggestion: true, nearlocationCollapse: true }) }}
                />
                <Icon.Ionicons name="ios-search" style={{position:'absolute', top: 15, left: 10, color: Colors.textGray}} size={18}/>
            </View>
        )
    }

    //Done button
    _doneButton = ()=>{
        this.setState({value: this.state.selectedItem, modalVisible: false});
        if(this.props.onChange){
            this.props.onChange(this.state.selectedItem);
        }
    }

    //Render header with search input
    _renderHeader = () => {
        return (
            <View>
                {this._searchInputComponent()}
                <FlatList
                    keyboardShouldPersistTaps='always' 
                    keyboardDismissMode='interactive'
                    style={{ flex: 1, backgroundColor: 'rgba(255,255,255,.9)', display:this.state.showSuggestion?'flex':'none'}}
                    data={this.state.suggestionLocations}
                    renderItem={this._renderSuggestion}
                    // ListHeaderComponent={this._headerComponent}
                    extraData={this.state}
                />
            </View>
        );
    };

    _renderSelectedLocation = () =>{
        if(!this.state.value.id){
            return (
                <TouchableOpacity style={styles.toggleButton} onPress={() => {this._setModalVisible(true)}}>
                    <Icon.MaterialIcons style={styles.toggleIcon} name="my-location" size={Styles.inputIconSize}/>
                    <AvenirText style={{...this.props.style}}>Select a location</AvenirText>
                </TouchableOpacity>
            )
        }else{
            const location = {
                latitude: this.state.value.geometry.location.lat,
                longitude: this.state.value.geometry.location.lng,
                latitudeDelta:  0.01,
                longitudeDelta: 0.01,
            }
            return (
                <View style={styles.selectedItemContainer}>
                    <TouchableOpacity style={{...styles.toggleButton, paddingTop: 7}} onPress={() => {!this.props.disabled && this._setModalVisible(true)}}>
                        <View>
                            <AvenirText weight="demi">{ this.state.value.name}</AvenirText>
                            <AvenirText style={{fontSize: Styles.smallFontSize, color: Colors.textGray}}>{ this.state.value.vicinity}</AvenirText>
                        </View>
                        {
                            !this.props.disabled && (<AvenirText style={{color:Colors.mainColor}}>Change</AvenirText>)
                        }
                    </TouchableOpacity>
                    <MapView
                        style={{ height: 120, borderRadius: 8, marginTop: 10, marginBottom: 10 }}
                        region={location}
                        initialRegion={location}
                        minZoomLevel={14}
                        maxZoomLevel={20}
                    >
                        <MapView.Marker coordinate={location}/>
                    </MapView>
                </View>
               
            )
        }
    }
    //MAIN VIEW 
    render() {
        return (
            <View style={{position: 'relative'}}>
                {this._renderSelectedLocation()}
                {
                    !this.props.disabled && (
                        <AnimatedModal 
                            title="Locations" 
                            searchInputComponent={this._renderHeader}
                            visible={this.state.modalVisible}
                            onDonePress={this._doneButton}
                            onHideModal={() => { this.setState({ modalVisible: false }) }}
                        >
                            <Animated
                                style={{ flex: 1, marginBottom: -80,}}
                                region={this.state.region}
                                minZoomLevel={14}
                                maxZoomLevel={20}
                                showsUserLocation={true}
                                showsMyLocationButton={true}
                            >
                                <MapView.Marker.Animated
                                    ref={marker => { this.marker = marker }}
                                    coordinate={this.state.location}
                                />
                            </Animated>
                            <KeyboardAvoidingView style={styles.autoCompleteContainer} enabled>
                                <TouchableOpacity style={{flexDirection:'row', alignContent: 'center', alignItems:'center', justifyContent:'center'}} onPress={()=>{this.setState({nearlocationCollapse:!this.state.nearlocationCollapse})}}>
                                    <AvenirText weight="demi" style={{fontSize: 16, paddingLeft: 20, paddingTop: 10, marginRight: 10, marginTop: -5}}>Nearly locations</AvenirText>
                                    {
                                        this.state.nearlocationCollapse?(<Icon.Ionicons name="ios-arrow-up" size={18}/>):(<Icon.Ionicons name="ios-arrow-down" size={18}/>)
                                    }
                                </TouchableOpacity>
                                    
                                <Collapsible collapsed={this.state.nearlocationCollapse}>
                                    <FlatList
                                        keyboardShouldPersistTaps="always"
                                        keyboardDismissMode="on-drag"
                                        ref={(list) => this.locationList = list}
                                        style={{maxHeight: 300, paddingHorizontal: 20}}
                                        data={this.state.locations}
                                        renderItem={this._renderLocation}
                                        onEndReachedThreshold={1}
                                        onEndReached={() => {
                                            this._loadMore();
                                        }}
                                    />
                                </Collapsible>
                            </KeyboardAvoidingView>
                        </AnimatedModal>
                    )
                }
                
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:'rgba(0,0,0,.5)',
    },
    toggleButton:{
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'space-between',
    },
    toggleIcon:{
        color: Colors.textGray,
        width: 25,
        textAlign: 'center'
    },
    button: {
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingVertical: 15,
    },
    buttonLabel: {
        color: Colors.mainColor,
        textAlign: 'center',
        fontSize: 16,
        marginTop: 3,
    },
    mainButton: {
        backgroundColor: Colors.mainColor
    },
    mainButtonLabel:{
        color: '#fff'
    },
    card:{
        flex:1,
        flexDirection:'row',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 0,
    },
    avatarContainer:{
        marginRight: 20,
        backgroundColor: Colors.iconBackgroundColor,
        height: 30,
        width: 30,
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30
    },
    avatar:{
        width: 15,
        height: 15,
    },
    locationContent:{
        flex: 1,
        borderBottomColor: Colors.borderColor,
        borderBottomWidth: 1,
        paddingVertical: 10,
    },
    locationName:{
        fontSize: 14
    },
    locationAddress:{
        color: Colors.textGray
    },
    searchBarWrap:{
        position:'absolute',
        top: 0,
        left: 0,
        right: 0, 
        zIndex: 1000
    },
    contactGroup:{
        fontSize: 18,
        paddingLeft: 20,
        backgroundColor: '#fff',
        paddingTop: 10
    },
    checkedIcon:{
        color: Colors.mainColor,
    },
    autoCompleteContainer:{
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        overflow: 'hidden',
        backgroundColor: '#fff',
        // position: 'absolute',
        bottom: 0,
        paddingTop: 10,
        paddingBottom: 38,
        left: 0,
        right: 0,
    }, 
    doneButton:{
        position: 'absolute',
        right: 20, 
        top: 20
    }
  });