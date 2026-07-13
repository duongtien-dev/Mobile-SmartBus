import { Check, ChevronDown } from 'lucide-react-native';
import React, { useState } from 'react';
import { Pressable, ScrollView, Text, TouchableOpacity, View } from 'react-native';

export interface SelectOption {
    value: string;
    label: string;
}

interface SelectMultiProps {
    options: SelectOption[];
    value: string[];
    onChange: (value: string[]) => void;
    placeholder?: string;
    disabled?: boolean;
    className?: string;
}

const SelectMulti = ({
    options = [],
    value = [],
    onChange,
    placeholder = 'Vui lòng chọn',
    disabled,
    className = '',
}: SelectMultiProps) => {
    const [isOpen, setIsOpen] = useState(false);

    // Xử lý chọn/bỏ chọn
    const handleSelect = (val: string) => {
        if (disabled) return;
        const newValues = value.includes(val)
            ? value.filter((v) => v !== val)
            : [...value, val];
        onChange(newValues);
    };

    // Text hiển thị khi đóng dropdown
    const displayLabels = options.filter(opt => value.includes(opt.value)).map(opt => opt.label);
    const displayText = displayLabels.length === 0
        ? placeholder
        : displayLabels.length <= 2
            ? displayLabels.join(', ')
            : `${displayLabels.slice(0, 2).join(', ')} (+${displayLabels.length - 2})`;

    return (
        <View className={`relative z-50 ${className}`}>
            {/* Backdrop đóng dropdown */}
            {isOpen && (
                <Pressable
                    style={{ position: 'absolute', width: '300%', height: '300%', top: '-100%', left: '-100%', zIndex: 40 }}
                    onPress={() => setIsOpen(false)}
                />
            )}

            {/* Nút bấm (Trigger) */}
            <TouchableOpacity
                activeOpacity={0.7}
                disabled={disabled}
                onPress={() => setIsOpen(!isOpen)}
                className={`w-full min-h-[40px] flex-row justify-between items-center bg-white border border-gray-300 rounded-md py-1.5 px-3 z-50 ${disabled ? 'opacity-60' : ''}`}
            >
                <Text className="flex-1 text-[14px] text-gray-800" numberOfLines={1}>
                    {displayText}
                </Text>
                <ChevronDown size={20} color="#6B7280" style={{ transform: [{ rotate: isOpen ? '180deg' : '0deg' }] }} />
            </TouchableOpacity>

            {/* Danh sách (Dropdown) */}
            {isOpen && (
                <View
                    className="absolute top-full mt-1 w-full bg-white border border-gray-300 rounded-md max-h-56 z-50 overflow-hidden"
                    style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 5 }}
                >
                    <ScrollView nestedScrollEnabled keyboardShouldPersistTaps="handled">
                        {options.map((opt) => {
                            const isSelected = value.includes(opt.value);
                            return (
                                <TouchableOpacity
                                    key={opt.value}
                                    activeOpacity={0.7}
                                    onPress={() => handleSelect(opt.value)}
                                    className={`flex-row items-center justify-between p-3 ${isSelected ? 'bg-[#f6f6f6]' : 'bg-white'}`}
                                >
                                    <Text className="text-[14px] font-semibold text-[#4f4f55]">
                                        {opt.label}
                                    </Text>
                                    {isSelected && <Check size={20} color="#655fff" />}
                                </TouchableOpacity>
                            );
                        })}
                    </ScrollView>
                </View>
            )}
        </View>
    );
};

export default SelectMulti;
