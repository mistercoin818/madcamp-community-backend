import 'package:flutter/material.dart';
import 'package:flutter_application/kakao_login.dart';
import 'package:flutter_application/main_view_model.dart';
import 'package:flutter_application/temp.dart';
import 'package:kakao_flutter_sdk_user/kakao_flutter_sdk_user.dart';
import 'package:http/http.dart' as http;
import 'package:flutter_application/mainpage.dart';
import 'package:flutter_application/User.dart';


void main(){
  KakaoSdk.init(nativeAppKey: 'd23dd62b763c232f0407e791dd4fc0f0');
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Kakao Login',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: const MyHomePage(
        title: '카카오 로그인'
      ),
    );
  }
}

class MyHomePage extends StatefulWidget {
  const MyHomePage({Key? key, required this.title}) : super(key: key);

  final String title;


  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  final viewModel = MainViewModel(KakaoLogin());
  bool isAuthenticated = false;

  Future<void> loginUser() async{
    // final url = Uri.parse('http://172.10.5.95:80/login');
    final url = Uri.parse('http://172.10.5.118:443/login');

    try{
      final response = await http.post(
        url,
        body: {'kakaoId': viewModel.kakaoId},
      );
      MyUser.copyKakaoId = viewModel.kakaoId;
      MyUser.copyNickname = viewModel.user!.kakaoAccount!.profile!.nickname!;
      MyUser.copyImageUrl = viewModel.user!.kakaoAccount!.profile!.profileImageUrl!.toString()!;
      if(response.statusCode == 200){
        setState((){
          isAuthenticated = true;
        });

        // print(viewModel.kakaoId);
        // print(viewModel.user!.kakaoAccount!.profile!.nickname!);
        print("##########################");
        print(MyUser.copyKakaoId);
        print(MyUser.copyNickname);
        print(MyUser.copyImageUrl);

        print("등록된 회원입니다.");
        Navigator.push(
          context,
          MaterialPageRoute(builder: (context) => MainPage()),
        );
      }
      else if(response.statusCode == 300){
        setState((){
          isAuthenticated = false;
        });
        print("등록되지 않은 회원입니다.");
        Navigator.push(
          context,
          MaterialPageRoute(builder: (context) => Authentication()),
        );
      }
    } catch(e){
      print("?!?!?!!?!?!?!");
      print(e);
    }
  }


  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(widget.title),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            CircleAvatar(
              radius: 150.0,
              backgroundImage:
                  NetworkImage("${viewModel.user?.kakaoAccount?.profile?.profileImageUrl}"),
                // Image.network(viewModel.user?.kakaoAccount?.profile?.profileImageUrl ?? ''),
              backgroundColor: Colors.transparent,
            ),
            SizedBox(height: 10.0),
            Text(
              viewModel.isLogined?
              '${viewModel.user?.kakaoAccount?.profile?.nickname}' : '카카오톡으로 로그인 해주세요.\n계정이 생성되어 있지 않은 경우 회원가입 페이지로 넘어갑니다.',
              style: TextStyle(
                fontWeight: FontWeight.bold,
                fontSize: 28,
                color: Colors.black
              ),
              textAlign: TextAlign.center,
            ),
            SizedBox(height: 10.0),
            ElevatedButton(
              onPressed: () async{
                await viewModel.login();
                await loginUser();
              },
              child: const Text('카카오톡으로 로그인'),
            ),
            ElevatedButton(
              onPressed: () async{
                await viewModel.logout();
                viewModel.kakaoId = '';
                setState(() {

                });
              },
              child: const Text('로그아웃'),
            ),
          ],
        )
      ),
    );
  }
  void showSnackBar(BuildContext context, Text text) {
    final snackBar = SnackBar(
      content: text,
      backgroundColor: Color.fromARGB(255, 112, 48, 48),
    );

    ScaffoldMessenger.of(context).showSnackBar(snackBar);
  }
}
