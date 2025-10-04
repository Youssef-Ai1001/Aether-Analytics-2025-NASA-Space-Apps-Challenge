import 'package:dartz/dartz.dart';

import '../../UI/manager/auth_state.dart';

abstract class AuthRepo {
  Future<Either<String, AuthResultState>> auth({required String email});

  Future<Either<String, int>> checkOtp({
    required String otp,
    required String email,
  });
}
