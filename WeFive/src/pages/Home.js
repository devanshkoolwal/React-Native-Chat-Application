import React, {Component} from 'react';
import { View, Text, Image, StyleSheet,TouchableOpacity } from 'react-native';
import { userList } from '../actions/userAction';
import { connect } from 'react-redux';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: []
        };
    }

    componentDidMount(){
        this.props.onUserList();
    }


    goChat = (userid, name) => {
        this.props.navigation.navigate('Chat', {userid: userid, name: name});
    }

    componentDidUpdate(nextProps) {
        if(this.props.userReducer && this.props.userReducer.userList && this.props.userReducer.userList!==nextProps.userReducer.userList && this.props.userReducer.userListSuccess===true) {
            this.setState({users: this.props.userReducer.userList});
            
        }
    }

render() {
    const { users } = this.state;
    return (
        <View style = {styles.container}>
            {users && users.length>0?
            <View>
                {users.map((item,index) =>
                {
                    return(<TouchableOpacity onPress={()=>this.goChat(item._id,item.name)} key={index}>
                       
                        <Text style={styles.item}>
                            {item.name}
                        </Text></TouchableOpacity>
                    )})}
            </View>:null}
            </View>
        );
    }
}

function mapStateToProps(state) {
    return{
        userReducer: state.userReducer
    };
}

function mapDispatchToProps(dispatch) {
    return{
        onUserList:() => dispatch(userList())
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);


const styles = StyleSheet.create({

    container: {
        flex: 1,
        paddingTop: 10,
        backgroundColor:'#b0b6b8',

    },
    item: {
        padding: 10,
        fontSize: 20,
        height: 50,
        color: '#000000',
        backgroundColor: '#ffffff',
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        borderRadius: 5,
        margin:2
    },
});

