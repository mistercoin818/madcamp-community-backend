import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http; // http 패키지 추가
import 'package:flutter_application/mainpage.dart';
import 'package:flutter_application/User.dart';

import 'join.dart';

class Authentication extends StatefulWidget {

  @override
  State<Authentication> createState() => _AuthenticationState();
}

class _AuthenticationState extends State<Authentication> {

  TextEditingController controller = TextEditingController();
  TextEditingController controller2 = TextEditingController();

  bool isChecked = false; // 회원 인증 여부를 저장하는 변수

  // 회원 인증 요청을 보내는 함수
  Future<void> authenticateUser() async {
    String name = controller.text;
    String studentId = controller2.text;
    // final profileInfo = {};

    // Express.js 서버의 URL 설정
    // final url = Uri.parse('http://172.10.5.95:80/authenticate');
    final url = Uri.parse('http://172.10.5.118:443/authenticate');

    try {
      final response = await http.post(
        url,
        body: {'name': name, 'studentId': studentId},
      );

      // 응답 처리
      if (response.statusCode == 200) {
        setState((){
          isChecked = true;
        });
        MyUser.copyName = name;
        MyUser.copyKAISTId = int.parse(studentId);
        print(MyUser.copyName);
        print(MyUser.copyKAISTId);
        print(MyUser.copyImageUrl);


        showSnackBar(context, Text('몰캠 회원 인증 완료.'));
        navigateToMainPage();
      }
      else{
        print("엥???");
      }
    } catch (e) {
      showSnackBar(context, Text('오류 발생'));
    }
  }

  void navigateToMainPage(){
    if(isChecked){
      Navigator.push(
        context,
        MaterialPageRoute(builder:(context) => Join()),
      );
    } else{
      showSnackBar(context, Text('인증이 안 됐어요!'));
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('회원 인증'),
        elevation: 0.0,
        backgroundColor: Colors.blueAccent,
        centerTitle: true,
      ),
      body: GestureDetector(
        onTap: () {
          FocusScope.of(context).unfocus();
        },
        child: SingleChildScrollView(
          child: Column(
            children: [
              Padding(padding: EdgeInsets.only(top: 50)),
              Center(
                child: Image(
                  image: AssetImage('assets/MadCamp.png'),
                  width: 170.0,
                ),
              ),
              Form(
                child: Theme(
                  data: ThemeData(
                    primaryColor: Colors.grey,
                    inputDecorationTheme: InputDecorationTheme(
                      labelStyle: TextStyle(color: Colors.black, fontSize: 15.0),
                    ),
                  ),
                  child: Container(
                    padding: EdgeInsets.all(40.0),
                    child: Builder(builder: (context) {
                      return Column(
                        children: [
                          TextField(
                            controller: controller,
                            autofocus: true,
                            decoration: InputDecoration(labelText: '이름'),
                            keyboardType: TextInputType.text,
                          ),
                          TextField(
                            controller: controller2,
                            decoration: InputDecoration(labelText: 'KAIST 학번'),
                            keyboardType: TextInputType.number,
                          ),
                          SizedBox(height: 40.0),
                          ButtonTheme(
                            minWidth: 100.0,
                            height: 50.0,
                            child: ElevatedButton(
                              onPressed: authenticateUser, // 버튼 클릭 시 회원 인증 요청 함수 호출
                              child: Icon(
                                Icons.arrow_forward,
                                color: Colors.white,
                                size: 35.0,
                              ),
                              style: ElevatedButton.styleFrom(
                                backgroundColor: Colors.blueAccent,
                              ),
                            ),
                          ),
                        ],
                      );
                    }),
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

void showSnackBar(BuildContext context, Text text) {
  final snackBar = SnackBar(
    content: text,
    backgroundColor: Color.fromARGB(255, 112, 48, 48),
  );

  ScaffoldMessenger.of(context).showSnackBar(snackBar);
}