import { Check, ChevronDown } from 'lucide-react-native';
import React, { useState } from 'react';
import { Dimensions, Pressable, ScrollView, Text, TouchableOpacity, View } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

interface OptionProps {
    children: React.ReactNode;
    value?: string;
    className?: string;
    hidden?: boolean;
}

interface SelectProps {
    children: React.ReactNode;
    onChange?: (value: string[]) => void;
    placeholder?: string;
    defaultValue?: string[];
    value?: string[];
    disabled?: boolean;
    className?: string;
}

const SelectMulti = ({
    onChange,
    children,
    placeholder = 'Vui lòng chọn',
    defaultValue = [],
    value,
    disabled,
    className = '',
}: SelectProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [internalValue, setInternalValue] = useState<string[]>(defaultValue);

    const currentValues = value ?? internalValue;

    const options = (React.Children.toArray(children).filter(React.isValidElement) as React.ReactElement<OptionProps>[])
        .filter(opt => !opt.props.hidden && opt.props.value);

    const handleChange = (val: string) => {
        if (disabled) return;
        const newValues = currentValues.includes(val)
            ? currentValues.filter((v) => v !== val)
            : [...currentValues, val];

        onChange?.(newValues);
        if (value === undefined) setInternalValue(newValues);
    };

    const getDisplayText = () => {
        const labels = options
            .filter((opt) => currentValues.includes(opt.props.value!))
            .map((opt) => opt.props.children);

        if (!labels.length) return placeholder;
        if (labels.length <= 2) return labels.join(', ');
        return `${labels.slice(0, 2).join(', ')} (+${labels.length - 2} mục)`;
    };

    return (
        <View className={`relative z-50 ${className}`}>

            {isOpen && (
                <Pressable
                    style={{ position: 'absolute', width: SCREEN_WIDTH * 2, height: SCREEN_HEIGHT * 2, top: -SCREEN_HEIGHT, left: -SCREEN_WIDTH, zIndex: 40 }}
                    onPress={() => setIsOpen(false)}
                />
            )}

            <TouchableOpacity
                activeOpacity={0.7}
                disabled={disabled}
                onPress={() => setIsOpen(!isOpen)}
                className={`w-full min-h-[40px] flex-row justify-between items-center bg-white border border-gray-300 rounded-md py-1.5 px-3 z-50 ${disabled ? 'opacity-60' : ''}`}
            >
                <Text className="flex-1 text-[14px] text-gray-800" numberOfLines={1}>
                    {getDisplayText()}
                </Text>
                <ChevronDown size={20} color="#6B7280" style={{ transform: [{ rotate: isOpen ? '180deg' : '0deg' }] }} />
            </TouchableOpacity>

            {isOpen && (
                <View
                    className="absolute top-full mt-1 w-full bg-white border border-gray-300 rounded-md max-h-56 z-50"
                    style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 5 }}
                >
                    <ScrollView nestedScrollEnabled keyboardShouldPersistTaps="handled">
                        {options.map((option, index) => {
                            const val = option.props.value!;
                            const isSelected = currentValues.includes(val);

                            return (
                                <TouchableOpacity
                                    key={val || index}
                                    activeOpacity={0.7}
                                    onPress={() => handleChange(val)}
                                    className={`flex-row items-center justify-between p-3 rounded-md ${isSelected ? 'bg-[#f6f6f6]' : 'bg-white'} ${option.props.className || ''}`}
                                >
                                    <View className="flex-1">
                                        {typeof option.props.children === 'string'
                                            ? <Text className="text-[14px] font-semibold text-[#4f4f55]">{option.props.children}</Text>
                                            : option.props.children}
                                    </View>
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

SelectMulti.Option = ({ children }: OptionProps) => <>{children}</>;
export default SelectMulti;