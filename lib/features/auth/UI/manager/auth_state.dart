abstract class AuthState {}

class AuthInitial extends AuthState {}

class AuthLoading extends AuthState {}

class AuthResultState extends AuthState {
  final int statusCode;
  final bool isNewUser; // true لو ده signup

  AuthResultState({required this.statusCode, required this.isNewUser});
}

class AuthFailure extends AuthState {
  final String errorMessage;

  AuthFailure(this.errorMessage);
}

class AuthSuccess extends AuthState {
  final int statusCode;

  AuthSuccess(this.statusCode);
}
