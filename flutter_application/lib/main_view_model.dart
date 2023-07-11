import 'package:flutter_application/social_login.dart';
import 'package:kakao_flutter_sdk_user/kakao_flutter_sdk_user.dart';

class MainViewModel {
  late String _kakaoId;
  final SocialLogin _socialLogin;
  bool isLogined = false;
  User? user;

  MainViewModel(this._socialLogin);

  String get kakaoId => _kakaoId;

  set kakaoId(String value){
    _kakaoId = value;
  }

  Future login() async{
    isLogined = await _socialLogin.login();
    if(isLogined){
      user = await UserApi.instance.me();
      print("@@@@@@@@@@@@@@@@@@@@");
      _kakaoId = user!.id.toString();
      print('${kakaoId}');
    }
  }

  Future logout() async{
    await _socialLogin.logout();
    isLogined = false;
    user = null;
  }
}