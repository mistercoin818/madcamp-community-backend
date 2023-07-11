import 'package:flutter/material.dart';
import 'package:flutter_application/kakao_login.dart';
import 'package:flutter_application/main_view_model.dart';
import 'package:kakao_flutter_sdk_user/kakao_flutter_sdk_user.dart';

void main() {
  KakaoSdk.init(nativeAppKey: 'd23dd62b763c232f0407e791dd4fc0f0');
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Kakao Login',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: const MyHomePage(title: '카카오 로그인 / 회원가입'),
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
          Image.network(viewModel
                  .user?.kakaoAccount?.profile?.profileImageUrl ??
              'https://www.thecocktaildb.com/images/media/drink/5noda61589575158.jpg'),
          Text(
            '${viewModel.user?.kakaoAccount?.profile?.nickname}',
            style: Theme.of(context).textTheme.headlineMedium,
          ),
          ElevatedButton(
            onPressed: () async {
              await viewModel.login();
              setState(() {});
            },
            child: const Text('Login'),
          ),
          ElevatedButton(
            onPressed: () async {
              await viewModel.logout();
              setState(() {});
            },
            child: const Text('Logout'),
          ),
        ],
      )),
    );
  }
}
