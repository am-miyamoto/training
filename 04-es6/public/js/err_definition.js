let err_definition = {
  username_empty: 'usernameを入力して下さい',
  username_irregal_chara: 'usernameに使える文字は英大小文字と-(ハイフン)です',
  username_irregal_length: 'usernameは4から8文字です',
  password_empty: 'Passwordを入力して下さい',
  password_irregal_chara: 'Passwordに使える文字は英大小文字と-,+,!,@,#,*,&,^,%,~です',
  password_irregal_length: 'Passwordは6から8文字です',
  password_equality_failed: '確認用Passwordが異なります'
};

if(typeof module === 'object') {
  module.exports.err_definition = err_definition;
}
