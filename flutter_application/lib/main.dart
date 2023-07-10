import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http; // http 패키지 추가
import 'package:flutter_application/login.dart';
import 'package:flutter_application/mainpage.dart';

void main(){
  // KakaoContext.clientId = '620b0619eb088184bd24b122d51df1c8';

  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Authentication',
      home: Authentication(),
    );
  }
}

class Authentication extends StatefulWidget {

  @override
  State<Authentication> createState() => _AuthenticationState();
}

class _AuthenticationState extends State<Authentication> {

  TextEditingController controller = TextEditingController();
  TextEditingController controller2 = TextEditingController();

  bool isAuthenticated = false; // 회원 인증 여부를 저장하는 변수

  // 회원 인증 요청을 보내는 함수
  Future<void> authenticateUser() async {
    String name = controller.text;
    String studentId = controller2.text;
    // final profileInfo = {};

    // Express.js 서버의 URL 설정
    final url = Uri.parse('http://localhost:8000/authenticate');

    try {
      final response = await http.post(
        url,
        body: {'name': name, 'studentId': studentId},
      );

      // 응답 처리
      if (response.statusCode == 200) {
        // 회원 인증 성공
        setState((){
          isAuthenticated = true;
        });
        // profileInfo['name'] = name;
        // print(profileInfo.length);
        showSnackBar(context, Text('등록된 회원입니다. 로그인 페이지로 넘어갑니다.'));
        navigateToMainPage();
        // navigateToLoginPage();
        // TODO: 인증 성공 후 수행할 작업 추가
      }
      else if (response.statusCode == 300){
        setState(() {
          isAuthenticated = true;
        });
        showSnackBar(context, Text('회원 인증 성공. 회원 가입 페이지로 넘어갑니다.'));
        navigateToMainPage();

        // navigateToKakaoLoginPage();
      }
      else {
        // 회원 인증 실패
        setState((){
          isAuthenticated = false;
        });
        showSnackBar(context, Text('회원 인증 실패'));
        // TODO: 인증 실패 후 수행할 작업 추가
      }
    } catch (e) {
      // 오류 발생
      showSnackBar(context, Text('오류 발생'));
      // TODO: 오류 발생 시 수행할 작업 추가
    }
  }
  //
  // void navigateToKakaoLoginPage(){
  //   if(isAuthenticated){
  //     Navigator.push(
  //       context,
  //       MaterialPageRoute(builder: (context) => KakaoLoginPage()),
  //     );
  //   } else {
  //     showSnackBar(context, Text('회원 인증이 필요합니다.'));
  //   }
  // }

  void navigateToLoginPage(){
    if(isAuthenticated){
      Navigator.push(
        context,
        MaterialPageRoute(builder: (context) => LoginPage()),
      );
    } else {
      showSnackBar(context, Text('회원 인증이 필요합니다.'));
    }
  }

  void navigateToMainPage(){
    if(isAuthenticated){
      Navigator.push(
        context,
        MaterialPageRoute(builder:(context) => MainPage()),
      );
    } else{
      showSnackBar(context, Text('회원 인증이 필요합니다.'));
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
