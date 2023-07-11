import 'dart:convert';
import 'dart:io';

import 'package:flutter_application/social_login.dart';
import 'package:kakao_flutter_sdk_user/kakao_flutter_sdk_user.dart';
import 'package:http/http.dart' as http; // http

class KakaoLogin implements SocialLogin{
  final url = Uri.http('kapi.kakao.com', '/v2/user/me');
  @override
  Future<bool> login() async{
    try{
      bool isInstalled = await isKakaoTalkInstalled();
      if(isInstalled){
        try{
          OAuthToken token = await UserApi.instance.loginWithKakaoTalk();
          // OAuthToken token = await UserApi.instance.loginWithKakaoAccount();
          print('카카오톡계정으로 로그인 성공 ${token.accessToken}');
          final response = await http.get(
            url,
            headers: {
              HttpHeaders.authorizationHeader: 'Bearer ${token.accessToken}'
            },
          );
          return true;
        } catch(e){
          return false;
        }
      } else{
        try{
          // await UserApi.instance.loginWithKakaoAccount();
          OAuthToken token = await UserApi.instance.loginWithKakaoAccount();
          print('카카오톡계정으로 로그인 성공 ${token.accessToken}');
          final response = await http.get(
            url,
            headers: {
              HttpHeaders.authorizationHeader: 'Bearer ${token.accessToken}'
            },
          );
          return true;
        } catch(e) {
          return false;
        }
      }
    } catch(e){
      return false;
    }
  }

  @override
  Future<bool> logout() async{
    try{
      await UserApi.instance.unlink();
      return true;
    } catch(error) {
      return false;
    }

  }

}