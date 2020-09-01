import React, {Component} from 'react';
import { ScrollView, View,Text, Image,ImageBackground ,TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { userLogin } from '../actions/userAction';
import { connect } from 'react-redux';
import {Button} from  'native-base';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email:'',
            password:'',
            errors: {} 
        };
        this.validateForm = this.validateForm.bind(this);
    }
    
    handleEmail = (text) => {
        this.setState({ email: text })
    }
    handlePassword = (text) => {
        this.setState({password: text })
    }

    validateForm(){
        const { errors } = this.state;
        const emailaddr = this.state.email;
        const pass = this.state.password;
        const reg = /^(?:\d{10}|\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$)$/;
        if (emailaddr === '') {
            errors.email="Email address cannot be empty.";
        } else if(emailaddr.length > 0 && !reg.test(emailaddr)){
            errors.email="Please provide correct email address.";
        } else {
            errors.email='';
        }

        if (pass ===''){
            errors.pass="Password cannot be empty.";
        } else if(pass && pass.length < 5) {
            errors.pass="Password should have more than 5 characters.";
        } else {
            errors.pass='';
        }
        this.setState({ errors })
        if(errors.email==='' && errors.pass===''){
        
          const userinfo={
            email:this.state.email,
            password:this.state.password
          }
           console.log(userinfo,"userinfo")
           this.props.onLogin(userinfo)
    }
}

    goToRegister = () => {
        this.props.navigation.navigate('Register');
    } 
componentDidUpdate(nextProps){
    if(this.props.userReducer && this.props.userReducer.userAuth && this.props.userReducer.userAuth!==nextProps.userAuth && this.props.userReducer.userAuthSuccess===true) {
        this.props.navigation.navigate('Home');
    }
}

    render() {
        const { errors} = this.state;
        return ( 
               

              <ScrollView>
                <ImageBackground 
             source={require('../images/background.jpg')}
             style={{width: 400, height: 800}}>

           

                <View style ={styles.container}>

                <Image  
                 style={{width: 175, height:100,right:30,bottom:50}}
                 source={require('../images/logo.jpg')}
            />
                <TextInput style = {styles.input}
                    underlineColorAndroid = "transparent"
                    placeholder = "Email"
                    placeholderTextColor = "#ffffff"
                    autoCapitalize = "none"
                    onChangeText = {this.handleEmail} /> 
                <Text style={[styles.errorstyle]}> {errors.email}</Text>

                <TextInput style = {styles.input}
                    underlineColorAndroid = "transparent"
                    placeholder = "Password"
                    placeholderTextColor = "#ffffff"
                    autoCapitalize = "none"
                    onChangeText = {this.handlePassword} />
                <Text style={[styles.errorstyle]}>{errors.pass}</Text>


                <TouchableOpacity 
                    style = {styles.submitButton}
                    onPress = {this.validateForm}>
                    <Text style = {styles.submitButtonText }> Login </Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style = {styles.RegisterButton}
                    onPress = {this.goToRegister}>
                    <Text style = {styles.RegisterButtonText }>Sign Up </Text>
                </TouchableOpacity>
            </View>
             </ImageBackground>
            </ScrollView>
            );    
    }
}
function mapStateToProps(state) {
    console.log(state,"state")
    return{
        userReducer:state.userReducer
    };
}
function mapDispatchToProps(dispatch){
    return{
        onLogin:(userinfo) => dispatch(userLogin(userinfo))
    };
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
    )(Login);

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
      
    },
   
    input: {
        margin: 10,
        height: 40,
        borderColor: '#000000',
        borderWidth: 1.5,
        width: '70%',
        padding: 10,
        fontSize: 13,
        lineHeight: 20,
        color: '#ffffff',
        right: 20
    },
    submitButton: {
        backgroundColor: '#000000',
        margin: 10,
        height: 40,
        borderRadius: 5,
        width: 80,
        left: -80,
        
    },
    submitButtonText:{
        color: '#FFFFFF',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        top:6

    },
    RegisterButton: {
        backgroundColor: '#000000',
        padding: 12,
        margin: 15,
        height: 40,
        borderRadius: 5,
        
        left: 40,
        marginTop: -50,
        
    },
    RegisterButtonText:{
        color: '#FFFFFF',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        bottom: 6,

    },
    errorstyle: {
        color: 'red',
    }
})