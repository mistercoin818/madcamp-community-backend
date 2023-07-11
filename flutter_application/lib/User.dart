class UserData{
  late String _copyKakaoId = '';
  String get copyKakaoId => _copyKakaoId;

  set copyKakaoId(String value){
    _copyKakaoId = value;
  }

  late String _copyImageUrl= '';
  String get copyImageUrl => _copyImageUrl;

  set copyImageUrl(String value){
    _copyImageUrl = value;
  }

  late String _copyNickname= '';
  String get copyNickname => _copyNickname;

  set copyNickname(String value){
    _copyNickname = value;
  }

  late String _copyName= '';
  String get copyName => _copyName;

  set copyName(String value){
    _copyName = value;
  }

  late int _copyKAISTId = 0;
  int get copyKAISTId => _copyKAISTId;

  set copyKAISTId(int value){
    _copyKAISTId = value;
  }
}

UserData MyUser = UserData();