import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:nasa_app/features/profile%20setup/UI/manager/profile_setup_state.dart';
import 'package:nasa_app/features/profile%20setup/data/models/profile_setup_model.dart';
import '../../data/repo/profile_setup_repo.dart';

class ProfileSetupCubit extends Cubit<ProfileSetupState> {
  final ProfileSetupRepo profileSetupRepo;

  ProfileSetupCubit(this.profileSetupRepo) : super(ProfileSetupInitial());

  Future<void> submitProfile(ProfileSetupModel profileSetupModel) async {
    emit(ProfileSetupLoading());

    final result = await profileSetupRepo.profileSetup(
      profileSetupModel: profileSetupModel,
    );

    result.fold(
      (error) => emit(ProfileSetupFailure(error)),
      (statusCode) => emit(ProfileSetupSuccess(statusCode)),
    );
  }
}
