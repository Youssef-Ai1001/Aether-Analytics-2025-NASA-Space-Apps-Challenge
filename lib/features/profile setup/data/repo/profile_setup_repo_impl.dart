import 'package:dartz/dartz.dart';
import 'package:nasa_app/core/network/api_service.dart';
import 'package:nasa_app/features/profile%20setup/data/models/profile_setup_model.dart';
import 'package:nasa_app/features/profile%20setup/data/repo/profile_setup_repo.dart';

class ProfileSetupRepoImpl implements ProfileSetupRepo {
  final ApiService apiService;

  ProfileSetupRepoImpl({required this.apiService});

  @override
  Future<Either<String, int>> profileSetup({
    required ProfileSetupModel profileSetupModel,
  }) async {
    final data = {
      "name": profileSetupModel.username,
      "email": profileSetupModel.email,
      "location": profileSetupModel.location,
      "sensitive": profileSetupModel.sensitive,
    };

    try {
      final response = await apiService.post(
        endPoint: "/auth/register",
        data: data,
      );
      return Right(response.statusCode ?? 0);
    } catch (error) {
      return Left(error.toString());
    }
  }
}
