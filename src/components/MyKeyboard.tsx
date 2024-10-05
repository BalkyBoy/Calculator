import * as React from "react";
import Button from "./Button";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { Styles } from "../styles/GlobalStyles";
import { myColors } from "../styles/Colors";

export default function MyKeyboard() {
    const [firstNumber, setFirstNumber] = React.useState("");
    const [secondNumber, setSecondNumber] = React.useState("");
    const [operation, setOperation] = React.useState("");
    const [result, setResult] = React.useState<Number | null>(null);
    const [recentInputs, setRecentInputs] = React.useState<string[]>([]); // State to track recent inputs
    const [showRecent, setShowRecent] = React.useState(false); // Toggle for recent tab

    const handleNumberPress = (buttonValue: string) => {
        if (firstNumber.length < 10) {
            setFirstNumber(firstNumber + buttonValue);
            addToRecent(`Pressed ${buttonValue}`);
        }
    };

    const handleOperationPress = (buttonValue: string) => {
        setOperation(buttonValue);
        setSecondNumber(firstNumber);
        setFirstNumber("");
        addToRecent(`Operation: ${buttonValue}`);
    };

    const clear = () => {
        setFirstNumber("");
        setSecondNumber("");
        setOperation("");
        setResult(null);
        addToRecent("Cleared");
    };

    const getResult = () => {
        let finalResult: number | null = null;
        switch (operation) {
            case "+":
                finalResult = parseInt(secondNumber) + parseInt(firstNumber);
                break;
            case "-":
                finalResult = parseInt(secondNumber) - parseInt(firstNumber);
                break;
            case "*":
                finalResult = parseInt(secondNumber) * parseInt(firstNumber);
                break;
            case "/":
                finalResult = parseInt(secondNumber) / parseInt(firstNumber);
                break;
            default:
                finalResult = 0;
                break;
        }
        if (finalResult !== null) {
            addToRecent(`${secondNumber} ${operation} ${firstNumber} = ${finalResult}`);
        }
        clear();
        setResult(finalResult);
    };

    const addToRecent = (input: string) => {
        setRecentInputs((prev) => [input, ...prev.slice(0, 4)]); // Keep last 5 inputs
    };

    const toggleRecent = () => {
        setShowRecent(!showRecent);
    };

    const firstNumberDisplay = () => {
        if (result !== null) {
            return (
                <Text
                    style={
                        Number(result) < 99999
                            ? [Styles.screenFirstNumber, { color: myColors.result }]
                            : [Styles.screenFirstNumber, { fontSize: 50, color: myColors.result }]
                    }
                >
                    {result?.toString()}
                </Text>
            );
        }
        if (firstNumber && firstNumber.length < 6) {
            return <Text style={Styles.screenFirstNumber}>{firstNumber}</Text>;
        }
        if (firstNumber === "") {
            return <Text style={Styles.screenFirstNumber}>{"0"}</Text>;
        }
        if (firstNumber.length > 5 && firstNumber.length < 8) {
            return <Text style={[Styles.screenFirstNumber, { fontSize: 70 }]}>{firstNumber}</Text>;
        }
        if (firstNumber.length > 7) {
            return <Text style={[Styles.screenFirstNumber, { fontSize: 50 }]}>{firstNumber}</Text>;
        }
    };

    return (
        <View style={Styles.viewBottom}>
            {/* Recent Tab Toggle */}
            <TouchableOpacity onPress={toggleRecent} style={Styles.recentTabButton}>
                <Text style={Styles.recentTabText}>
                    {showRecent ? "Back to Calculator" : "Show Recent"}
                </Text>
            </TouchableOpacity>

            {showRecent ? (
                <ScrollView style={{ maxHeight: 300, marginBottom: 10 }}>
                    {recentInputs.length > 0 ? (
                        recentInputs.map((item, index) => (
                            <Text key={index} style={Styles.historyText}>
                                {item}
                            </Text>
                        ))
                    ) : (
                        <Text style={Styles.historyText}>No Recent Inputs</Text>
                    )}
                </ScrollView>
            ) : (
                <>
                
                    <View
                        style={{
                            height: 120,
                            width: "90%",
                            justifyContent: "flex-end",
                            alignSelf: "center",
                        }}
                    >
                        <Text style={Styles.screenSecondNumber}>
                            {secondNumber}
                            <Text style={{ color: "purple", fontSize: 50, fontWeight: "500" }}>
                                {operation}
                            </Text>
                        </Text>
                        {firstNumberDisplay()}
                    </View>

            
                    <View style={Styles.row}>
                        <Button title="C"  onPress={clear} />
                        <Button title="+/-"  onPress={() => handleOperationPress("+/-")} />
                        <Button title="%"  onPress={() => handleOperationPress("%")} />
                        <Button title="/"  onPress={() => handleOperationPress("/")} />
                    </View>
                    <View style={Styles.row}>
                        <Button title="7" onPress={() => handleNumberPress("7")} />
                        <Button title="8" onPress={() => handleNumberPress("8")} />
                        <Button title="9" onPress={() => handleNumberPress("9")} />
                        <Button title="x"  onPress={() => handleOperationPress("*")} />
                    </View>
                    <View style={Styles.row}>
                        <Button title="4" onPress={() => handleNumberPress("4")} />
                        <Button title="5" onPress={() => handleNumberPress("5")} />
                        <Button title="6" onPress={() => handleNumberPress("6")} />
                        <Button title="-"  onPress={() => handleOperationPress("-")} />
                    </View>
                    <View style={Styles.row}>
                        <Button title="1" onPress={() => handleNumberPress("1")} />
                        <Button title="2" onPress={() => handleNumberPress("2")} />
                        <Button title="3" onPress={() => handleNumberPress("3")} />
                        <Button title="+"  onPress={() => handleOperationPress("+")} />
                    </View>
                    <View style={Styles.row}>
                        <Button title="." onPress={() => handleNumberPress(".")} />
                        <Button title="0" onPress={() => handleNumberPress("0")} />
                        <Button title="@" onPress={() => setFirstNumber(firstNumber.slice(0, -1))} />
                        <Button title="=" isBlue onPress={() => getResult()} />
                    </View>
                </>
            )}
        </View>
    );
}


