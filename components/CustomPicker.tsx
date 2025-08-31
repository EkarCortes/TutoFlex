// components/CustomPicker.js
import React, { useState } from "react";
import { Platform } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

type CustomPickerProps = {
    items?: Array<{ label: string; value: any }>;
    placeholder?: string;
    value: any;
    setValue: (value: any) => void;
};

export default function CustomPicker({
    items = [],
    placeholder = "Seleccione una opción",
    value,
    setValue,
}: CustomPickerProps) {
    const [open, setOpen] = useState(false);

    // Web/desktop: Picker nativo
    if (Platform.OS === "web") {
        return (
            <div style={{ width: "100%" }}>
                <select
                    value={value ?? ""}
                    onChange={e => setValue(e.target.value)}
                    style={{
                        width: "100%",
                        height: 20,
                        background: "#fff",
                        border: "1px solid #d1d5db",
                        borderRadius: 8,
                        fontSize: 16,
                        color: "#1f2937",
                        paddingLeft: 40,
                        marginBottom: 8,
                        outline: "none",
                        appearance: "none",
                    }}
                >
                    <option value="" disabled>{placeholder}</option>
                    {items.map((item, idx) => (
                        <option key={idx} value={item.value}>{item.label}</option>
                    ))}
                </select>
            </div>
        );
    }
    // Móvil: DropDownPicker
    return (
        <DropDownPicker
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            placeholder={placeholder}
            style={{
                backgroundColor: '#fff',
                borderColor: '#d1d5db',
                borderRadius: 8,
                height: 48,
                paddingLeft: 40,
            }}
            dropDownContainerStyle={{
                backgroundColor: '#fff',
                borderColor: '#d1d5db',
                borderRadius: 8,
                maxHeight: 48 * 3 + 8, // 3 items + padding
            }}
            containerProps={{
                style: { width: "100%" },
            }}
            placeholderStyle={{
                fontSize: 16,
                color: "#9ca3af",
            }}
            labelStyle={{
                fontSize: 16,
                color: "#1f2937",
            }}
            listItemLabelStyle={{
                fontSize: 16,
                color: "#1f2937",
            }}
            selectedItemLabelStyle={{
                fontWeight: "bold",
                color: "#1f2937",
            }}
        />
    );
}
