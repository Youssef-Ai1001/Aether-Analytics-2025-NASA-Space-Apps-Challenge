import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.ensemble import RandomForestRegressor, GradientBoostingRegressor
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score, root_mean_squared_error
from sklearn.tree import DecisionTreeRegressor
from sklearn.svm import SVR
from sklearn.base import BaseEstimator
from pathlib import Path
import joblib
import os
from typing import Dict

# ======================= Load function =======================
def load_data(path: str) -> pd.DataFrame:
    """
    Load a dataset from a CSV file.

    This function attempts to read a CSV file from the given path and 
    return it as a pandas DataFrame.

    Args:
        path (str): Path to the CSV file.

    Returns:
        pd.DataFrame: Dataset loaded into a DataFrame.

    Raises:
        FileNotFoundError: If the file does not exist at the given path.
        pd.errors.EmptyDataError: If the file is empty.
        pd.errors.ParserError: If the file cannot be parsed as CSV.
        ValueError: If the path provided is not a CSV file.
    """
    file_path = Path(path)

    # Validate file existence
    if not file_path.exists():
        raise FileNotFoundError(f"File not found at: {file_path}")

    # Validate file extension
    if file_path.suffix.lower() != ".csv":
        raise ValueError("Only CSV files are supported.")

    try:
        data = pd.read_csv(file_path)
        return data
    except pd.errors.EmptyDataError:
        raise pd.errors.EmptyDataError("The CSV file is empty.")
    except pd.errors.ParserError:
        raise pd.errors.ParserError("Error parsing the CSV file.")


# ======================= Preprocess function =======================
def preprocess_data(df: pd.DataFrame) -> tuple[pd.DataFrame, pd.Series, pd.DataFrame]:
    """
    Preprocess AQI dataset for modeling.

    Steps:
        - Standardize column names (lowercase, underscores instead of spaces).
        - Remove duplicates and missing values.
        - Validate required columns.
        - Select only the 4 pollutant features.
        - Separate features (pollutants) and target (AQI Value).

    Args:
        df (pd.DataFrame): Raw AQI dataset.

    Returns:
        tuple:
            X (pd.DataFrame): Feature matrix with pollutant values.
            y (pd.Series): Target variable (AQI Value).
            df (pd.DataFrame): Cleaned dataset containing both features and target.

    Raises:
        ValueError: If required columns are missing.
    """
    # Copy dataset to avoid modifying original
    df = df.copy()

    # Clean column names
    df.columns = [col.strip().lower().replace(" ", "_") for col in df.columns]

    # Drop missing values and duplicates
    df = df.dropna().drop_duplicates()

    # Validate required columns
    required_cols = ["aqi_value", "co_aqi_value", "ozone_aqi_value", "no2_aqi_value", "pm2.5_aqi_value"]
    missing = [col for col in required_cols if col not in df.columns]
    if missing:
        raise ValueError(f"Missing required columns: {missing}")

    # Define target and features (only 4 pollutants)
    y = df["aqi_value"]
    X = df[["co_aqi_value", "ozone_aqi_value", "no2_aqi_value", "pm2.5_aqi_value"]]

    return X, y, df


# ======================= EDA function =======================
def perform_eda(df: pd.DataFrame, target: str = None) -> None:
    """
    Perform Exploratory Data Analysis (EDA) on a dataset.
    """
    print("========== Dataset Shape ==========")
    print(df.shape, "\n")

    print("========== Data Types ==========")
    print(df.dtypes, "\n")

    print("========== Missing Values ==========")
    print(df.isnull().sum(), "\n")

    print("========== Duplicated Rows ==========")
    print(f"Number of duplicates: {df.duplicated().sum()}\n")

    print("========== Descriptive Statistics ==========")
    print(df.describe(include="all"), "\n")

    # Correlation Heatmap (numeric only)
    numeric_df = df.select_dtypes(include=["number"])
    if not numeric_df.empty:
        plt.figure(figsize=(10, 6))
        sns.heatmap(numeric_df.corr(), annot=True, cmap="coolwarm", fmt=".2f")
        plt.title("Correlation Heatmap")
        plt.show()

    if target and target in df.columns:
        # Distribution of target
        plt.figure(figsize=(8, 5))
        sns.histplot(df[target], kde=True, bins=30)
        plt.title(f"Distribution of {target}")
        plt.show()

        # Relationship of features with target
        numeric_features = [col for col in numeric_df.columns if col != target]
        for col in numeric_features:
            plt.figure(figsize=(8, 5))
            sns.scatterplot(x=df[col], y=df[target])
            plt.title(f"{col} vs {target}")
            plt.show()


# ======================= Feature Selection function =======================
def feature_selection(X: pd.DataFrame, y: pd.Series, top_n: int = None) -> pd.DataFrame:
    """
    Perform feature selection using correlation and RandomForest feature importance.

    Args:
        X (pd.DataFrame): Feature matrix.
        y (pd.Series): Target variable.
        top_n (int, optional): Number of top features to return. If None, return all.

    Returns:
        pd.DataFrame: DataFrame containing feature names and their importance scores.
    """
    results = {}

    # 1. Correlation with target
    corr = pd.concat([X, y], axis=1).corr()
    target_corr = corr[y.name].drop(y.name)
    results["correlation"] = target_corr

    # Plot correlation heatmap
    plt.figure(figsize=(8, 5))
    sns.heatmap(corr, annot=True, cmap="coolwarm", fmt=".2f")
    plt.title("Correlation Heatmap")
    plt.show()

    # 2. Feature importance (RandomForest)
    model = RandomForestRegressor(random_state=42)
    model.fit(X, y)
    importances = pd.Series(model.feature_importances_, index=X.columns)
    results["importance"] = importances

    # Plot feature importances
    plt.figure(figsize=(8, 5))
    importances.sort_values(ascending=False).plot(kind="bar", color="skyblue")
    plt.title("Feature Importance (RandomForest)")
    plt.ylabel("Importance Score")
    plt.show()

    # Combine into DataFrame
    feature_scores = pd.DataFrame({
        "correlation_with_target": target_corr,
        "random_forest_importance": importances
    })

    feature_scores = feature_scores.sort_values("random_forest_importance", ascending=False)

    # Return top_n if specified
    if top_n:
        return feature_scores.head(top_n)
    return feature_scores


# ======================= Splitting Data function =======================
def split_data(
    X: pd.DataFrame,
    y: pd.Series,
    test_size: float,
    val_size: float = None,
    random_state: int = 42
):
    """
    Split dataset into training, testing (and optional validation) sets.

    Args:
        X (pd.DataFrame): Feature matrix.
        y (pd.Series): Target variable.
        test_size (float): Proportion of data to include in the test set (default=0.2).
        val_size (float, optional): Proportion of data to include in the validation set 
                                    from the training split. If None, no validation set is created.
        random_state (int): Random seed for reproducibility.

    Returns:
        tuple: (X_train, X_test, y_train, y_test) or 
               (X_train, X_val, X_test, y_train, y_val, y_test) if val_size is provided.
    """
    # Split into train and test first
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=test_size, random_state=random_state)

    # Optional validation split
    if val_size:
        X_train, X_val, y_train, y_val = train_test_split(X_train, y_train, test_size=val_size, random_state=random_state)
        
        return X_train, X_val, X_test, y_train, y_val, y_test

    return X_train, X_test, y_train, y_test


# ======================= Train and Evaluate function =======================
def train_and_evaluate(X_train, X_test, y_train, y_test):
    """
    Train and evaluate multiple regression models on the dataset.

    Returns:
        results (dict): Model evaluation metrics.
        models (dict): Trained model objects.
    """
    models = {
        "Linear Regression": LinearRegression(),
        "Decision Tree": DecisionTreeRegressor(random_state=42),
        "Random Forest": RandomForestRegressor(random_state=42),
        "Gradient Boosting": GradientBoostingRegressor(random_state=42),
        "SVR (RBF Kernel)": SVR(kernel="rbf")
    }

    results = {}

    for name, model in models.items():
        model.fit(X_train, y_train)
        y_pred = model.predict(X_test)

        mae = mean_absolute_error(y_test, y_pred)
        rmse = root_mean_squared_error(y_test, y_pred)
        r2 = r2_score(y_test, y_pred)

        results[name] = {"MAE": mae, "RMSE": rmse, "R²": r2}
        print(f"\n{name} Results:") 
        print(f" MAE : {mae:.2f}") 
        print(f" RMSE: {rmse:.2f}") 
        print(f" R² : {r2:.2f}")
        
    return results, models


# ======================= Plotting Results function =======================
def plot_results(results: dict) -> None:
    """
    Plot evaluation metrics for multiple models.

    Args:
        results (dict): Dictionary of model results where keys are model names and 
                        values are dictionaries containing metrics (MAE, RMSE, R²).
    """
    # Convert results dict to DataFrame
    results_df = pd.DataFrame(results).T  # Models as rows
    results_df = results_df.sort_index()  # Sort by model names

    # Plot MAE and RMSE side by side
    plt.figure(figsize=(12, 5))

    plt.subplot(1, 2, 1)
    results_df[["MAE", "RMSE"]].plot(kind="bar", ax=plt.gca())
    plt.title("MAE & RMSE Comparison")
    plt.ylabel("Error Value")
    plt.xticks(rotation=45)

    plt.subplot(1, 2, 2)
    results_df["R²"].plot(kind="bar", color="skyblue", ax=plt.gca())
    plt.title("R² Score Comparison")
    plt.ylabel("R² Score")
    plt.xticks(rotation=45)

    plt.tight_layout()
    plt.show()


# ======================= save all Trained models function =======================
def save_models_separately(models: Dict[str, BaseEstimator], save_dir: str = "models") -> None:
    """
    Save each trained model into a separate file inside the given directory.

    Args:
        models (dict): Dictionary of trained models. 
                       Example: {"linear_regression": lr_model, "random_forest": rf_model}
        save_dir (str): Directory to save the models. Default is 'models'.

    Returns:
        None
    """
    # Create directory if not exists
    os.makedirs(save_dir, exist_ok=True)

    for name, model in models.items():
        # Replace spaces with underscores for safe filenames
        filename = f"{name.replace(' ', '_').lower()}.pkl"
        filepath = os.path.join(save_dir, filename)

        # Save model
        joblib.dump(model, filepath)
        print(f"✅ Saved {name} to {filepath}")


# ======================= plot train test performance function =======================
def plot_train_test_performance(models, X_train, X_test, y_train, y_test):
    """
    Compare training and testing performance of models 
    to analyze accuracy, loss, and overfitting.
    """
    results = []

    for name, model in models.items():
        # Train
        model.fit(X_train, y_train)

        # Predict Train & Test
        y_train_pred = model.predict(X_train)
        y_test_pred = model.predict(X_test)

        # Train metrics
        train_mae = mean_absolute_error(y_train, y_train_pred)
        train_rmse = np.sqrt(mean_squared_error(y_train, y_train_pred))
        train_r2 = r2_score(y_train, y_train_pred)

        # Test metrics
        test_mae = mean_absolute_error(y_test, y_test_pred)
        test_rmse = np.sqrt(mean_squared_error(y_test, y_test_pred))
        test_r2 = r2_score(y_test, y_test_pred)

        results.append({
            "Model": name,
            "Train_R²": train_r2,
            "Test_R²": test_r2,
            "Train_RMSE": train_rmse,
            "Test_RMSE": test_rmse,
            "Train_MAE": train_mae,
            "Test_MAE": test_mae
        })

    results_df = pd.DataFrame(results)

    # Plot Accuracy (R²)
    results_df.plot(x="Model", y=["Train_R²", "Test_R²"], kind="bar", figsize=(10,6))
    plt.title("Train vs Test Accuracy (R²)")
    plt.ylabel("R² Score")
    plt.ylim(0, 1.05)
    plt.legend(["Train R²", "Test R²"])
    plt.show()

    # Plot Loss (RMSE)
    results_df.plot(x="Model", y=["Train_RMSE", "Test_RMSE"], kind="bar", figsize=(10,6))
    plt.title("Train vs Test Loss (RMSE)")
    plt.ylabel("RMSE")
    plt.legend(["Train RMSE", "Test RMSE"])
    plt.show()

    # Plot Loss (MAE)
    results_df.plot(x="Model", y=["Train_MAE", "Test_MAE"], kind="bar", figsize=(10,6))
    plt.title("Train vs Test Loss (MAE)")
    plt.ylabel("MAE")
    plt.legend(["Train MAE", "Test MAE"])
    plt.show()

    return results_df


# ======================= Save Results function =======================
def save_results_to_csv(df: pd.DataFrame, filepath: str) -> None:
    """
    Save results DataFrame to CSV file.
    Creates parent directories if they don't exist.
    """
    os.makedirs(os.path.dirname(filepath), exist_ok=True)
    df.to_csv(filepath, index=False)
    print(f"✅ Results saved to {filepath}")


# ======================= Main Script =======================
if __name__ == "__main__":
    DATA_PATH = '/home/mango/Coding/Nasa/data/AQI-and-Lat-Long-of-Countries.csv'

    # Load dataset
    df = load_data(DATA_PATH)

    # Preprocess (features, target, cleaned dataframe)
    X, y, df_cleaned = preprocess_data(df)

    # Perform EDA (using cleaned df with target)
    perform_eda(df_cleaned, target="aqi_value")

    # Split Data
    X_train, X_test, y_train, y_test = split_data(X, y, test_size=0.2)

    # Train & Evaluate Models
    results, models = train_and_evaluate(X_train, X_test, y_train, y_test)

    # Plot Results
    plot_results(results)
    
    # Save each model separately
    save_models_separately(models, save_dir="./models")
    
    # Compare train vs test
    performance_df = plot_train_test_performance(models, X_train, X_test, y_train, y_test)
    print(performance_df)
    
    results_df = pd.DataFrame(results).T.reset_index().rename(columns={"index": "Model"})

    save_results_to_csv(results_df, "./results/model_results.csv")
    save_results_to_csv(performance_df, "./results/train_test_performance.csv")
    