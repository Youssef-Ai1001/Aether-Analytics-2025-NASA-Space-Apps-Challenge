import 'package:dartz/dartz.dart';
import 'package:flutter/cupertino.dart';
import 'package:nasa_app/core/network/api_service.dart';
import 'package:nasa_app/features/auth/data/repo/auth_repo.dart';

import '../../UI/manager/auth_state.dart';

class AuthRepoImpl implements AuthRepo {
  final ApiService apiService;

  AuthRepoImpl({required this.apiService});

  @override
  Future<Either<String, AuthResultState>> auth({required String email}) async {
    try {
      // نجرب login أول
      final loginResponse = await apiService.post(
        endPoint: "/auth/register/login",
        data: {"email": email},
      );

      // لو login ناجح → المستخدم موجود
      if (loginResponse.statusCode != null && loginResponse.statusCode! < 400) {
        return Right(
          AuthResultState(statusCode: loginResponse.statusCode!, isNewUser: false),
        );
      }

      // لو login فشل → نعمل signup وطلب OTP
      final signUpResponse = await apiService.post(
        endPoint: "/auth/register/request-otp",
        data: {"email": email},
      );

      return Right(
        AuthResultState(statusCode: signUpResponse.statusCode ?? 0, isNewUser: true),
      );
    } catch (error) {
      debugPrint("❌❌${error.toString()}");
      return Left(error.toString());
    }
  }

  @override
  Future<Either<String, int>> checkOtp({
    required String otp,
    required String email,
  }) async {
    try {
      final response = await apiService.post(
        endPoint: "/auth/register/verify-otp",
        data: {"otp": otp, "email": email},
      );
      return Right(response.statusCode ?? 0);
    } catch (error) {
      return Left(error.toString());
    }
  }
}
