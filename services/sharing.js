import * as Sharing from 'expo-sharing';
import { captureRef as takeSnapshotAsync } from 'react-native-view-shot';


export const sharer = (data) => Sharing.shareAsync(formatFileUri(data)); 


export const converterToUri = async ({elementRef, type='tmpfile', format='png', quality = 1}) => {

    try{
        const result = await takeSnapshotAsync(elementRef, {
            type,
            quality,
            format,
        });
    return result

    }catch(e){
      console.log(e)
    }
}

export const converterToShareFile = async (convertProperties) => {
    try{
        const uri = await converterToUri(convertProperties)
        return sharer(uri)
    }
    catch(e){
        console.error(e)
    }
}

formatFileUri = (stringUri) => stringUri.indexOf("file://") >= 0 ? stringUri : `file://${stringUri}`  

