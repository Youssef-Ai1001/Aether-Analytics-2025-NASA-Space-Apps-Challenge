import 'package:dartz/dartz.dart';

abstract class AuthRepo {
  Future<Either<String, int>> auth({required String email});

  Future<Either<String, int>> checkOtp({
    required String otp,
    required String email,
  });
}
