import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:flutter_application/User.dart';
import 'package:http/http.dart' as http; // http 패키지 추가
import 'package:flutter_application/mainpage.dart';
import 'package:flutter_application/main.dart';

class Join extends StatefulWidget {

  @override
  State<Join> createState() => _JoinState();
}

class _JoinState extends State<Join> {

  TextEditingController controller = TextEditingController(); // nickname
  TextEditingController controller2 = TextEditingController(); // school
  List<int> dropdownList = [0, 1, 2, 3, 4];
  int selectedDropdown = 1;


  bool isAdded = false; // 회원 인증 여부를 저장하는 변수

  // 회원 인증 요청을 보내는 함수
  Future<void> joinUser() async {
    String nickname = controller.text;
    String school = controller2.text;
    // final profileInfo = {};

    // Express.js 서버의 URL 설정
    // final url = Uri.parse('http://172.10.5.95:80/join');
    final url = Uri.parse('http://172.10.5.118:443/join');

    try {
      final response = await http.post(
        url,
        body: {'kakaoId': MyUser.copyKakaoId, 'userName': MyUser.copyName, 'nickname': nickname, 'school': school, 'studentId': MyUser.copyKAISTId.toString(), 'group': selectedDropdown.toString(), 'profileImg': MyUser.copyImageUrl},
      );

      // 응답 처리
      if (response.statusCode == 200) {
        setState((){
          isAdded = true;
        });
        showSnackBar(context, Text('회원 등록 완료.'));
        navigateToMainPage();
      }
      else{
        print("엥???");
      }
    } catch (e) {
      print(e);
      showSnackBar(context, Text('오류 발생'));
    }
  }

  void navigateToMainPage(){
    if(isAdded){
      Navigator.push(
        context,
        MaterialPageRoute(builder:(context) => MainPage()),
      );
    } else{
      showSnackBar(context, Text('회원 등록이 안 됐어요!'));
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
                child: CircleAvatar(
                  radius: 150.0,
                  backgroundImage:
                  NetworkImage(MyUser.copyImageUrl),
                  // Image.network(viewModel.user?.kakaoAccount?.profile?.profileImageUrl ?? ''),
                  backgroundColor: Colors.transparent,
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
                            decoration: InputDecoration(labelText: '닉네임'),
                            keyboardType: TextInputType.text,
                          ),
                          TextField(
                            controller: controller2,
                            decoration: InputDecoration(labelText: '학교'),
                            keyboardType: TextInputType.text,
                          ),
                          SizedBox(height: 20.0),
                          Text('분반을 입력해주세요.'),
                          DropdownButton(
                              value: selectedDropdown,
                              items: dropdownList.map((int item) {
                                return DropdownMenuItem<int>(
                                    child: Text('$item'),
                                    value: item,
                                );
                              }).toList(),
                              onChanged: (dynamic value){
                                setState(() {
                                  selectedDropdown = value;
                                });
                              },
                          ),
                          SizedBox(height: 40.0),
                          ButtonTheme(
                            minWidth: 100.0,
                            height: 50.0,
                            child: ElevatedButton(
                              onPressed: joinUser, // 버튼 클릭 시 회원 인증 요청 함수 호출
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