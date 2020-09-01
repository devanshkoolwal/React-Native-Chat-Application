import React, { Component } from 'react';
import axios from 'axios';
import Toast from 'react-native-simple-toast';
import { View, Text,ImageBackground,Image, TouchableOpacity, TextInput, StyleSheet } from 'react-native'; 

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            displayname: '',
            email: '',
            password: '',
            errors: {}
        };
        this.validateForm = this.validateForm.bind(this);
    }
     

    handleName = (text) => {
        this.setState({ name: text})
      }

      handleDisplayName = (text) => {
        this.setState({ displayname: text})
      }

    handleEmail = (text) => {
        this.setState({ email: text})
      }
      handlePassword = (text) => {
        this.setState({ password: text})
      }


      validateForm () {
        const { errors } = this.state;
        const name = this.state.name;
        const displayname = this.state.displayname;
        const emailaddr = this.state.email;
        const pass = this.state.password;
        const reg = /^(?:\d{10}|\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$)$/;
        
        if (name === ''){
            errors.name = "Name cannot be empty.";
        } else {
            errors.name = '';
        }

        if (displayname === ''){
            errors.displayname = " Display name cannot be empty.";
        } else {
            errors.displayname = '';
        }

        if (emailaddr === ''){
          errors.email = "Email address cannot be empty.";
        } else if (emailaddr.length > 0 && !reg.test(emailaddr)){
          errors.email = "Please provide correct email address";
        } else {
          errors.email = '';
        }
    
        if (pass === ''){
          errors.pass = "Password cannot be empty.";
        } else if (pass && pass.length < 5) {
          errors.pass = "Password should be more than 5 characters.";
    
        } else {
          errors.pass = '';
    
        } 
        this.setState({ errors})
        if (errors.name==='' && errors.displayname==='' && errors.email=== '' && errors.pass === ''){
          this.submitForm();
        }
      }

submitForm = async () => {
    let that = this;
    axios.post('http://192.168.0.131:8082/registeruser',{
        name: this.state.name,
        displayname: this.state.displayname,
        email: this.state.email,
        password: this.state.password
    })
    .then(function (response) {
        if(response && response.data && response.data._id) {
            that.props.navigation.navigate('Home');
        } else {
            Toast.show(respone.data.message, 1000); 
        }
    })
    .catch(function (error){
        console.log(error);
    });

}

goToLogin = () => {
    this.props.navigation.navigate('Login');
}

render() {
    const { errors } = this.state;
    return (
        <View style={styles.container}>
         <ImageBackground 
             source={require('../images/background.jpg')}
             style={{width: 400, height: 800}}>
        <View style={styles.container}>
        

                <Image  
                 style={{width: 175, height:100,bottom:50}}
                 source={require('../images/logo.jpg')}
            />

        <View style={styles.inputView} >
            <TextInput  
              style={styles.inputText}
              placeholder="Name" 
              placeholderTextColor="#003f5c"
              autoCapitalize="none"
              onChangeText={this.handleName}/>
           <Text style={[styles.errorstyle]}>{errors.name}</Text>      
          </View>

          <View style={styles.inputView} >
            <TextInput  
              style={styles.inputText}
              placeholder="Display Name" 
              placeholderTextColor="#003f5c"
              autoCapitalize="none"
              onChangeText={this.handleDisplayName}/>
           <Text style={[styles.errorstyle]}>{errors.displayname}</Text>      
          </View>
         
          <View style={styles.inputView} >
            <TextInput  
              style={styles.inputText}
              placeholder="Email" 
              placeholderTextColor="#003f5c"
              autoCapitalize="none"
              onChangeText={this.handleEmail}/>
           <Text style={[styles.errorstyle]}>{errors.email}</Text>      
          </View>
  
  
          <View style={styles.inputView} >
            <TextInput  
              secureTextEntry
              style={styles.inputText}
              placeholder="Password" 
              placeholderTextColor="#003f5c"
              autoCapitalize="none"
              onChangeText={this.handlePassword}/>
            <Text style={[styles.errorstyle]}>{errors.pass}</Text>  
          </View>
  
  
        
          <TouchableOpacity style={styles.register}
          onPress={this.validateForm}>
            <Text style={styles.registerText}>Sign Up</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.login}
          onPress = {this.goToLogin}>
            <Text style={styles.loginText}>Login</Text>
          </TouchableOpacity>
          </View>
          </ImageBackground>
          </View>
    );
  }
}


export default Register;

const styles = StyleSheet.create({

    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      
    },

    inputView:{
      width:"80%",
      
      borderColor: "#000000",
      borderWidth: 1.5,
      height:50,
      marginBottom:20,
      justifyContent:"center",
      padding:10,
      paddingTop: 25,
    },
    inputText:{
      height:50,
      color:"white"
    },
    
    register:{
     backgroundColor: '#000000',
         backgroundColor: '#000000',
        margin: 10,
        height: 40,
        borderRadius: 5,
        width: 90,
        left: -60,
        
    },

       registerText: {
   color: '#FFFFFF',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        top:6
    },
    login:{
           backgroundColor: '#000000',
        padding: 12,
        margin: 15,
        height: 40,
        borderRadius: 5,
        
        left: 40,
        marginTop: -50,
    },

     loginText:{
        color: '#FFFFFF',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        bottom: 6,
      

    },
 
    errorstyle:{                          
      fontSize: 10,
     alignSelf: 'center',
     color: 'red'
   }
  
   
   

  
  });