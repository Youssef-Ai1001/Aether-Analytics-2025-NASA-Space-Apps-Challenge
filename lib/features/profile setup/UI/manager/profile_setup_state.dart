abstract class ProfileSetupState {}

class ProfileSetupInitial extends ProfileSetupState {}

class ProfileSetupLoading extends ProfileSetupState {}

class ProfileSetupSuccess extends ProfileSetupState {
  final int statusCode;

  ProfileSetupSuccess(this.statusCode);
}

class ProfileSetupFailure extends ProfileSetupState {
  final String error;

  ProfileSetupFailure(this.error);
}
