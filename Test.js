import React, { Component } from 'react';
import {
    StatusBar,
    View,
    Modal,
    SafeAreaView,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Text,
    Animated,
    Easing,
    Image,
    TextInput,
    ImageBackground,
    ScrollView,
    Platform,
    Keyboard,
    AsyncStorage,
    KeyboardAvoidingView,
    Alert
} from 'react-native';
import { API, DEVICE } from '../../../lib/api';

// redux
// import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';

import Icon from 'react-native-vector-icons/FontAwesome';
import IconMat from 'react-native-vector-icons/MaterialIcons';

import CheckBox from '../../../components/CheckBox/_CheckBox';
import InputView from '../../../components/InputView/ExperimentalInputView';
import Input from '../../../components/Input/_Input';
import Select from '../../../components/Select/_Select';
import Call from '../../screens/calls/_Call';

import * as country from '../../../assets/data/countries';
import * as COLORS from '../../../assets/styles/colors';
import * as images from '../../../assets/images/map';

import app_styles from '../../../assets/styles/app';
import styles from './home';

import { globalVars, CALL_TYPE, SKEY_REMEMBER_USERID, SKEY_USERID } from '../../../lib/globals';



class Home extends Component {

    constructor(props) {
        super(props);

        this.inputs_error = true;
        this._isMounted = false;

        this.state = {
            userId: '',
            userId_error: {},
            password: '',
            password_error: {},
            inputs_error: true,
            pushToken: '34567ujhgfe345',
            remember_userId: false,
            modal_type: CALL_TYPE.LOGIN,
            modal_visible: false,
            country: 'NG',
            inputUserErrorBGColor: new Animated.Value(0),
            inputPasswordErrorBGColor: new Animated.Value(0)
        }

        this.setModalVisible = this.setModalVisible.bind(this);
        this.onToggleCheckBox = this.onToggleCheckBox.bind(this);
        this.buttonHandler = this.buttonHandler.bind(this);
        this.onChangeText = this.onChangeText.bind(this);
        this.onInputValidation = this.onInputValidation.bind(this);
        this.loadUserData = this.loadUserData.bind(this);
        this.recheck = this.recheck.bind(this);
    }


    componentWillMount() {
        this.loadUserData();
    }

    componentDidMount() {
        this._isMounted = true;
    }


    setModalVisible(visible, type) {
        this.setState({
            modal_visible: visible,
            modal_type: type
        });
    }


    async loadUserData() {
        try {
            const remember = await AsyncStorage.getItem(SKEY_REMEMBER_USERID) || false;
            const userId = await AsyncStorage.getItem(SKEY_USERID) || '';
            this.setState({
                remeber_userId: remember,
                userId: userId
            });
        } catch (error) {
            console.log('AsyncStorage error:');
            console.log(error);
        }
    }


    onChangeText(attr, t) {
        this.setState({
            [attr]: t
        });
    }


    onInputValidation(attr, data) {
        this.setState({
            [attr]: data
        }, () => {
            this.inputs_error = this.state.userId_error != null || this.state.password_error != null
        });
    }


    recheck(flag, delay) {
        switch (flag) {
            case 'userId':
                this.input_userId.checkExplicitly();
                break;

            case 'password':
                setTimeout(() => {
                    this.input_password.checkExplicitly();
                }, delay);
                break;
        }
    }


    onToggleCheckBox(checked) {
        this.setState({
            remember_userId: checked
        }, () => {
            console.log('checked:', checked);
        });
    }


    buttonHandler(flag) {
        switch (flag) {
            case 'login':
                Keyboard.dismiss();
                console.log('this.inputs_error:', this.inputs_error);

                if (this.inputs_error) {
                    let delay = 0;
                    if (this.state.userId_error) {
                        this.recheck('userId', delay);
                        delay = 400;
                    }
                    if (this.state.password_error) {
                        this.recheck('password', delay);
                    }
                    return;
                }
                const data = {
                    userId: this.state.userId,
                    password: this.state.password,
                    pushToken: this.state.pushToken,
                    versionNumber: '6.0.0.0',
                    platform: Platform.OS === 'ios' ? 'iOS' : 'Android',
                }
                //this.setModalVisible(true, CALL_TYPE.LOGIN);
                this.setState({
                    modal_visible: true,
                });
                break;

            case 'forgot-login':
                console.log('flag:', flag);
                break;

            case 'register':
                console.log('flag:', flag);
                break;

            case 'open-account':
                console.log('flag:', flag);
                break;

            case 'airtime':
                console.log('flag:', flag);
                break;

            case 'transfer':
                console.log('flag:', flag);
                break;

            case 'loans':
                console.log('flag:', flag);
                break;

            case 'change-device':
                console.log('flag:', flag);
                break;

            case 'help':
                console.log('flag:', flag);
                break;

            case 'chat':
                console.log('flag:', flag);
                break;

            case 'banking':
                console.log('flag:', flag);
                break;
        }
    }

    _renderModalContent() {
        switch (this.state.modal_type) {
            case CALL_TYPE.LOGIN:
                const data = {
                    userId: this.state.userId,
                    password: this.state.password,
                    pushToken: this.state.pushToken,
                    versionNumber: '6.0.0.0',
                    platform: Platform.OS === 'ios' ? 'iOS' : 'Android',
                }
                return <Call
                    data={data}
                    type={this.state.modal_type}
                    remember_userId={this.state.remember_userId}
                    close={this.setModalVisible}
                    navigateToDashboard={() => this.props.navigation.navigate('Dashboard')}
                />;
        }

    }


    render() {

        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={[app_styles.root_view, { backgroundColor: '#fff' }]}>

                    <Modal animationType='fade' visible={this.state.modal_visible} transparent onRequestClose={() => { }}>
                        {this._renderModalContent()}
                    </Modal>

                    <StatusBar barStyle='default' translucent animated backgroundColor='#00000044' />

                    <View style={styles.header_container}>
                        <View style={styles.header_content}>
                            <Image resizeMode='contain' source={images.logo} style={styles.headerImg} />
                            <View style={styles.select_container}>
                                <Select data={country.countries} placeholder='Select Country' type="country_select" default_country="NG"
                                    callback={(item) => { this.setState({ country: item.code }) }}
                                />
                            </View>
                        </View>
                    </View>

                    <View style={styles.middleContainer}>
                        <View style={styles.backgroundContainer}>
                            <InputView>
                                <Input
                                    ref={(input) => this.input_userId = input}
                                    placeholder={'Username'}
                                    validationMode={'req'}
                                    text={this.state.userId}
                                    underlineColorAndroid='transparent'
                                    keyboardType='default'
                                    onChangeText={(t) => { this.onChangeText('userId', t) }}
                                    onValidation={(data) => this.onInputValidation('userId_error', data)}
                                />
                                <Input
                                    ref={(input) => this.input_password = input}
                                    placeholder={'Password'}
                                    validationMode={'req'}
                                    secureTextEntry={true}
                                    text={this.state.password}
                                    underlineColorAndroid='transparent'
                                    keyboardType='default'
                                    onChangeText={(t) => { this.onChangeText('password', t) }}
                                    onValidation={(data) => this.onInputValidation('password_error', data)}
                                    rightIcon='fingerprint'
                                    iconLib='MaterialIcons'
                                    iconStyle={{
                                        width: '12%',
                                        marginLeft: 5,
                                        fontSize: 23,
                                        color: COLORS.text,
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}
                                    wrapperStyle={{ marginTop: 7 }}
                                />
                                <View style={styles.checkbox_container}>
                                    <CheckBox labelStyle={styles.checkbox} label='Remember Username' onToggleCheck={this.onToggleCheckBox} />
                                </View>
                            </InputView>
                            <View style={styles.button_container}>
                                <TouchableOpacity style={styles.sign_in_btn} onPress={() => this.buttonHandler('login')}>
                                    <Text style={styles.sign_in_text}>SIGN IN</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.buttonHandler('forgot-login')}>
                                    <Text style={styles.forgot_login_text}>Forgot Login Details?</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={styles.register_container}>
                                <TouchableOpacity onPress={() => this.buttonHandler('register')}>
                                    <View style={styles.register_content}>
                                        <IconMat name="add" size={25} />
                                        <Text style={styles.register_text}>Register Now</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.buttonHandler('open-account')}>
                                    <View style={styles.register_content}>
                                        <Icon name="user-plus" size={20} />
                                        <Text style={styles.open_account_text}>Open an Account</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <ImageBackground style={styles.backgroundImg} source={require('../../../assets/images/diamond-watermark.png')} resizeMode='contain'>
                        </ImageBackground>
                    </View>

                    <View style={styles.quick_container}>
                        <TouchableOpacity onPress={() => this.buttonHandler('airtime')}>
                            <View style={styles.quick_content}>
                                <IconMat name="smartphone" style={styles.quick_mobile_icon} />
                                <Text style={styles.quick_text}>Quick Airtime</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.buttonHandler('transfer')}>
                            <View style={styles.quick_content}>
                                <Icon name="exchange" style={styles.quick_icon} />
                                <Text style={styles.quick_text}>Quick Transfer</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.buttonHandler('loans')}>
                            <View style={styles.quick_content}>
                                <Icon name="file-o" style={styles.quick_icon} />
                                <Text style={styles.quick_text}>Quick Loans</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.bottom_container}>
                        <SafeAreaView style={styles.bottom_container_content}>
                            <View style={styles.footer_column}>
                                <TouchableOpacity onPress={() => this.buttonHandler('change-device')}>
                                    <View style={styles.footer_content}>
                                        <Icon name="mobile" size={30} style={styles.changed_device} />
                                        <Text style={styles.footer_text}>Changed Device</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.buttonHandler('chat')}>
                                    <View style={styles.footer_content}>
                                        <IconMat name="forum" size={24} style={styles.live_chat} />
                                        <Text style={styles.footer_text}>Live Chat</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.footer_column}>
                                <TouchableOpacity onPress={() => this.buttonHandler('help')}>
                                    <View style={styles.footer_content}>
                                        <IconMat name="phone" size={24} style={styles.help} />
                                        <Text style={styles.footer_text}>Help & Contact</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.buttonHandler('banking')}>
                                    <View style={styles.footer_content}>
                                        <Icon name="desktop" size={22} style={styles.internet_banking} />
                                        <Text style={styles.footer_text_banking}>Internet Banking</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </SafeAreaView>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

export default Home;