import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, TextInput, View, Button, Pressable, ScrollView, Keyboard, } from "react-native";
import Constants from "expo-constants";
import { useState } from "react";
// import { Dropdown } from 'react-native-material-dropdown';

export default function App() {
  //constants and functions
  //list
  const [students, setStudents] = useState([]);
  //gender true: female, false: male
  const [student, setStudent] = useState({
    id: 0,
    name: "",
    age: 0,
    gender: true,
  });

  const [name, setname] = useState("");
  const [age, setage] = useState(0);
  const [gender, setgender] = useState(true);
  const [genderStr, setgenderstr] = useState('');

  const [check, setCheck] = useState(false);

  // to set IDs
  // let count = 0;

  //utility to reset current student
  const resetStudent = () => {
    // setStudent({
    //   id: 0,
    //   name: '',
    //   age: 0,
    //   gender: '',
    // });
    setname('');
    setage(0);
    setgender(true);
    setgenderstr('');
    setCheck(false);
    // count = 0;
  };

  const addStudent = () => {
    // alert(students.length);
    // student.id = count++;
    // setStudents([...students, student]);
    // alert(student.id + " " + student.name + student.gender + student.age)
    // alert(student.id + " " + name + gender + age);
    setStudents([
      ...students,
      {
        // id: ++count,
        name: name,
        age: age,
        gender: gender,
        genderStr: genderStr,
      },
    ]);
    resetStudent();
    // alert('hi');
    // console.log(count)
    Keyboard.dismiss();
  };

  const resetData = () => {
    resetStudent();
    setStudents([]);
    // count = 0;
  };

  const checkInput = () => {
    // alert('in check function')
    // using regex
    let name_re = /^[a-zA-z ]{2,}$/;
    let age_re = /^[0-9]{1,3}$/;
    // if (name_re.test(name))
    //   alert('right')
    //checking gender
    let genderValid = false;
    // alert(genderStr)
      // console.log(name)
      switch(genderStr.toLowerCase()){
      case ('male'):
        genderValid = true;
        setgender(false);
        break;
      case ('female'):
        genderValid = true;
        setgender(true);
        break;
    }
    setCheck(name_re.test(name) && age_re.test(age) && age > 0 && genderValid);
  }

  return (
    <View style={styles.container}>
      {/* heading */}
      <Text style={styles.heading}>Students Manager</Text>

      {/* <Text>
        {name} {gender} {age} jhjhj
      </Text> */}

      <ScrollView style={styles.scroll}>
        {/* text input fields */}
        <View style={styles.input_view}>
          <TextInput
            style={styles.text_input}
            placeholder="Name"
            autoComplete="off"
            value={name}
            // onChange={checkInput}
            onChangeText={(name)=>{setname(name); checkInput()}}
          />
          <TextInput
            style={styles.text_input}
            placeholder="Age"
            autoComplete="off"
            value={age}
            // onChange={checkInput}
            onChangeText={(age)=>{setage(age); checkInput()}}
          />
          <TextInput
            style={styles.text_input}
            placeholder="Gender"
            autoComplete="off"
            value={genderStr}
            // onChange={checkInput}
            onChangeText={(genderStr)=>{checkInput(); setgenderstr(genderStr);}}
          />
        </View>

        {/* submit button */}
        {/* <Pressable
          style={styles.button}
          disabled={!check}
          onPress={addStudent}
        >
          <Text style={styles.btn_txt}>Submit</Text>
        </Pressable> */}

        <View
          style={styles.button}
          // disabled={checkInput}
          // onPress={addStudent}
        >
          <Button style={styles.btn_txt} onPress={addStudent} disabled={!check} title='Submit' color='#91B1E7'/>
        </View>

        {/* list to display the results */}
        <View style={styles.list_view}>
          <Text style={styles.students_head}>Added Students:</Text>

          {/* list */}
          <View style={styles.students_list}>
            {/* container for one student to be used in list */}
            {students.map((element, index) => (
              <View style={styles.student} key={index}>
                <Text style={styles.student_text}>{index+1}. Name: {element.name}</Text>
                <Text style={styles.student_text}>Age: {element.age}</Text>
                <Text style={styles.student_text}>Gender: {element.genderStr}</Text>
              </View>
            ))}
          </View>

          {/* reset button */}
          {/* <Pressable style={styles.button} onPress={resetData}>
            <Text style={styles.btn_txt}>Reset</Text>
          </Pressable> */}

          <View
          style={styles.button}
        >
          <Button style={styles.btn_txt} onPress={resetData} title='Reset' color='#91B1E7'/>
        </View>

        </View>

      </ScrollView>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFD",
    marginTop: Constants.statusBarHeight,
  },
  heading: {
    fontSize: 22,
    textAlign: "center",
    backgroundColor: "#76A6EF",
    color: "#F8FAFD",
    padding: 12,
  },
  input_view: {
    padding: 12,
  },
  text_input: {
    borderBottomWidth: 1,
    padding: 7,
    borderBottomColor: "#CFD8E6",
    fontSize: 16,
  },
  button: {
    backgroundColor: "#91B1E7",
    // paddingHorizontal: 20,
    // paddingVertical: 8,
    alignSelf: "flex-end",
    elevation: 3,
    marginTop: 5,
    marginLeft: 5,
    marginRight: 20,
    borderRadius: 3,
  },
  btn_txt: {
    color: "#F8FAFD",
    textAlign: "center",
  },
  list_view: {
    borderTopWidth: 1,
    borderTopColor: "#CFD8E6",
    marginTop: 15,
    marginBottom: 25,
  },
  students_head: {
    color: "#76A6EF",
    fontSize: 20,
    fontWeight: "bold",
    paddingHorizontal: 12,
    paddingTop: 8,
  },
  students_list: {
    paddingHorizontal: 12,
    marginBottom: 10,
  },
  student: {
    borderBottomWidth: 1,
    borderBottomColor: "#CFD8E6",
    paddingVertical: 8,
  },
  student_text: {
    fontSize: 16,
  },
  scroll: {
    // paddingBottom: 10,
  },
});
