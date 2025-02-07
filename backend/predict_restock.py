import pandas as pd
from fbprophet import Prophet

def predict_restock():
    df = pd.read_csv("sales_data.csv")
    df = df.rename(columns={"Дата": "ds", "Продажи": "y"})

    model = Prophet()
    model.fit(df)

    future = model.make_future_dataframe(periods=30)
    forecast = model.predict(future)

    restock_day = future[forecast['yhat'] > df['Остаток'].iloc[-1]].min()

    return {"restock_day": str(restock_day)}

if __name__ == "__main__":
    result = predict_restock()
    print(result)
