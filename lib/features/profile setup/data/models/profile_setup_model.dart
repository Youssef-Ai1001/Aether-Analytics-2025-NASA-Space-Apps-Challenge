class ProfileSetupModel {
  final String email;
  final String location; // هنا هيبقى stateCode اللي بيختاره اليوزر
  final bool sensitive;
  final String username;

  ProfileSetupModel({
    required this.email,
    required this.location,
    required this.sensitive,
    required this.username,
  });

  factory ProfileSetupModel.fromJson(Map<String, dynamic> json) {
    return ProfileSetupModel(
      email: json['email'] ?? '',
      location: json['location'] ?? '',
      sensitive: json['sensitive'] ?? false,
      username: json['username'] ?? '',
    );
  }

  ProfileSetupModel copyWith({
    String? email,
    String? location,
    bool? sensitive,
    String? username,
  }) {
    return ProfileSetupModel(
      email: email ?? this.email,
      location: location ?? this.location,
      sensitive: sensitive ?? this.sensitive,
      username: username ?? this.username,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      "email": email,
      "location": location,
      "sensitive": sensitive,
      "username": username,
    };
  }
}
