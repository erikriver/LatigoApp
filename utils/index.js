import Icons from '../constants/Icons';
import Colors from '../constants/Colors';
import { colors } from 'react-native-elements';

export function randomColor() {
    const values = [...new Array(3)].map(() => Math.random() * 256).join(',');

    return `rgb(${values})`;
}

export function getIcon(id){
    if (Icons[id]){
        return Icons[id].image
    }else{
        return null
    }
}

export function getIconColor(id) {
    if (Icons[id] && Icons[id].color) {
        return Icons[id].color
    } else {
        var colors = [Colors.iconBackgroundColor,'#E04F5E', '#035FD2','#00EFD1', '#EFC84A', '#27A2DB','#4E5565'];
        return colors[Math.floor(Math.random() * colors.length)]
    }
}
export function isIconFullSize(id) {
    if (Icons[id]) {
        return Icons[id].fullSize == true
    } else {
        return false
    }
}