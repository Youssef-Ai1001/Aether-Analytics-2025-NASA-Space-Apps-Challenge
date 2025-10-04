import 'package:dartz/dartz.dart';

import '../models/profile_setup_model.dart';

abstract class ProfileSetupRepo {
  Future<Either<String, int>> profileSetup({
    required ProfileSetupModel profileSetupModel,
  });
}
