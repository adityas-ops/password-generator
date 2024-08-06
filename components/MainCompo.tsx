import React, {useState, useCallback} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import * as yup from 'yup';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {Formik} from 'formik';

const MainCompo = () => {
  const passwordSchema = yup.object().shape({
    passwordLength: yup
      .number()
      .min(4, 'Password length is too short - should be 4 chars minimum.')
      .max(16, 'Password length is too long - should be 16 chars maximum.')
      .required('Password length is required'),
  });

  const [password, setPassword] = useState<string>('');
  const [isPasswordGenerated, setIsPasswordGenerated] =
    useState<boolean>(false);
  const [lowercase, setLowercase] = useState<boolean>(true);
  const [uppercase, setUppercase] = useState<boolean>(false);
  const [numbers, setNumbers] = useState<boolean>(true);
  const [symbols, setSymbols] = useState<boolean>(true);

  const generatePassword = useCallback(
    (passwordLength: number) => {
      let characterList = '';
      const uppercaseCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      const lowercaseCharacters = 'abcdefghijklmnopqrstuvwxyz';
      const numberCharacters = '0123456789';
      const symbolCharacters = '!@#$%^&*()_+';

      if (uppercase) {
        characterList += uppercaseCharacters;
      }
      if (lowercase) {
        characterList += lowercaseCharacters;
      }
      if (numbers) {
        characterList += numberCharacters;
      }
      if (symbols) {
        characterList += symbolCharacters;
      }

      setPassword(createPassword(characterList, passwordLength));
      setIsPasswordGenerated(true);
    },
    [uppercase, lowercase, numbers, symbols],
  );

  const createPassword = (characters: string, passwordLength: number) => {
    let result = '';
    for (let i = 0; i < passwordLength; i++) {
      const charactersIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(charactersIndex);
    }
    return result;
  };

  const resetPassword = useCallback(() => {
    setPassword('');
    setIsPasswordGenerated(false);
    setLowercase(true);
    setUppercase(false);
    setNumbers(true);
    setSymbols(true);
  }, []);

  return (
    <ScrollView keyboardShouldPersistTaps="handled">
      <SafeAreaView style={styles.appContainer}>
        <View style={styles.formContainer}>
          <Text style={styles.title}>Password Generator</Text>
          <Formik
            initialValues={{passwordLength: ''}}
            validationSchema={passwordSchema}
            onSubmit={values => {
              generatePassword(Number(values.passwordLength));
            }}>
            {({
              handleChange,
              handleSubmit,
              values,
              isValid,
              errors,
              touched,
              handleReset,
            }) => (
              <View style={styles.appContainer}>
                <View style={styles.inputWrapper}>
                  <View style={styles.inputColumn}>
                    <Text style={styles.heading}>Password Length</Text>
                    {touched.passwordLength && errors.passwordLength && (
                      <Text style={styles.errorText}>
                        {errors.passwordLength}
                      </Text>
                    )}
                  </View>
                  <TextInput
                    style={styles.inputStyle}
                    placeholder="Password Length"
                    onChangeText={handleChange('passwordLength')}
                    value={values.passwordLength}
                    keyboardType="numeric"
                  />
                </View>
                <View style={styles.inputWrapper}>
                  <View style={styles.inputColumn}>
                    <Text style={styles.heading}>Include Lowercase</Text>
                  </View>
                  <View style={styles.BouncyCheckboxLength}>
                    <BouncyCheckbox
                      isChecked={lowercase}
                      onPress={() => setLowercase(!lowercase)}
                      fillColor="#5DA3FA"
                    />
                  </View>
                </View>
                <View style={styles.inputWrapper}>
                  <View style={styles.inputColumn}>
                    <Text style={styles.heading}>Include Uppercase</Text>
                  </View>
                  <View style={styles.BouncyCheckboxLength}>
                    <BouncyCheckbox
                      isChecked={uppercase}
                      onPress={() => setUppercase(!uppercase)}
                      fillColor="#FF1E51"
                    />
                  </View>
                </View>
                <View style={styles.inputWrapper}>
                  <View style={styles.inputColumn}>
                    <Text style={styles.heading}>Include Number</Text>
                  </View>
                  <View style={styles.BouncyCheckboxLength}>
                    <BouncyCheckbox
                      isChecked={numbers}
                      onPress={() => setNumbers(!numbers)}
                      fillColor="#1AB0DC"
                    />
                  </View>
                </View>
                <View style={styles.inputWrapper}>
                  <View style={styles.inputColumn}>
                    <Text style={styles.heading}>Include Symbols</Text>
                  </View>
                  <View style={styles.BouncyCheckboxLength}>
                    <BouncyCheckbox
                      isChecked={symbols}
                      onPress={() => setSymbols(!symbols)}
                      fillColor="#FC80A5"
                    />
                  </View>
                </View>
                <View style={styles.buttonHandle}>
                  <TouchableOpacity
                    disabled={!isValid}
                    style={styles.primaryBtn}
                    onPress={() => {
                      handleSubmit();
                    }}>
                    <Text style={styles.primaryBtnTxt}>Generate Password</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.secondaryBtn}
                    onPress={() => {
                      handleReset();
                      resetPassword();
                    }}>
                    <Text style={styles.secondaryBtnTxt}>Reset</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </Formik>
          {isPasswordGenerated && (
            <View style={[styles.card, styles.cardElevated]}>
              <Text style={styles.generatedPassword}>{password}</Text>
            </View>
          )}
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  heading: {
    fontSize: 18,
  },
  appContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  formContainer: {
    margin: 8,
    padding: 8,
    marginTop: 50,
  },
  title: {
    fontSize: 32,
    fontWeight: '600',
    marginBottom: 15,
    textAlign: 'center',
  },
  inputWrapper: {
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '100%',
  },
  inputColumn: {
    flexDirection: 'column',
  },
  inputStyle: {
    padding: 8,
    width: '40%',
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#16213e',
  },
  errorText: {
    fontSize: 12,
    color: '#ff0d10',
  },
  primaryBtn: {
    width: 160,
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 8,
    backgroundColor: '#5DA3FA',
  },
  primaryBtnTxt: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '700',
  },
  secondaryBtn: {
    width: 160,
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 8,
    backgroundColor: '#CAD5E2',
  },
  secondaryBtnTxt: {
    textAlign: 'center',
  },
  card: {
    padding: 12,
    borderRadius: 6,
    marginHorizontal: 12,
  },
  cardElevated: {
    backgroundColor: '#ffffff',
    elevation: 1,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowColor: '#333',
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  generatedPassword: {
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 12,
    color: '#000',
  },
  BouncyCheckboxLength: {
    width: '10%',
  },
  buttonHandle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
});

export default MainCompo;
