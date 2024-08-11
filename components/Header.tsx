import { useUser } from "@clerk/clerk-expo";
import { Image, Text, View } from "react-native";

const Header = () => {
    const { user } = useUser();
    return ( 
        <View style={{display:'flex', flexDirection:'row', alignItems:'center', gap:5}} >
            <Image source={{uri:user?.imageUrl}} style={{borderRadius:50, height:50, width:50}} />
        <View>
        <Text /* style={styles.title} */>Welcome</Text>
        <Text style={{fontSize:20, fontWeight:'bold'}}>{user?.fullName}</Text>
        </View>

        </View>
     );
}
 
export default Header;