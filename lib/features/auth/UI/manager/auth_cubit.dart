import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:nasa_app/features/auth/UI/manager/auth_state.dart';
import 'package:nasa_app/features/auth/data/repo/auth_repo.dart';

class AuthCubit extends Cubit<AuthState> {
  final AuthRepo authRepo;

  AuthCubit({required this.authRepo}) : super(AuthInitial());

  Future<void> authenticate({required String email}) async {
    emit(AuthLoading());
    final result = await authRepo.auth(email: email);

    result.fold(
          (failure) => emit(AuthFailure(failure)),
          (authResult) => emit(AuthResultState(
        statusCode: authResult.statusCode,
        isNewUser: authResult.isNewUser,
      )),
    );
  }

  Future<void> verifyOtp({required String otp, required String email}) async {
    emit(AuthLoading());
    final result = await authRepo.checkOtp(otp: otp, email: email);

    result.fold(
          (failure) => emit(AuthFailure(failure)),
          (statusCode) => emit(AuthSuccess(statusCode)),
    );
  }
}
