import {
    Select as BaseSelect,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import * as React from 'react';

type SelectOptionType = {
    value: string;
    label: string;
};

type SelectProps = React.ComponentPropsWithoutRef<typeof BaseSelect> & {
    placeholder?: string;
    children?: React.ReactNode; // Đổi thành optional vì bạn có thể chỉ truyền options
    className?: string;
    triggerClassName?: string;
    contentClassName?: string;
    options?: SelectOptionType[]; // Thêm prop options
};

type SelectOptionProps = React.ComponentPropsWithoutRef<typeof SelectItem>;

type SelectComponent = React.FC<SelectProps> & {
    Option: React.FC<SelectOptionProps>;
};

const Select: SelectComponent = ({
    placeholder = 'Chọn',
    children,
    className,
    triggerClassName,
    contentClassName,
    options = [], // Gán default bằng mảng rỗng
    ...props
}) => {
    return (
        <BaseSelect {...props}>
            <SelectTrigger className={cn(className, triggerClassName)}>
                <SelectValue
                    className="text-sm text-foreground native:text-lg"
                    placeholder={placeholder}
                />
            </SelectTrigger>
            <SelectContent className={contentClassName}>
                {/* Ưu tiên render options nếu có truyền vào, ngược lại fallback về children */}
                {options.length > 0
                    ? options.map((option) => (
                        <Select.Option key={option.value} value={option.value}>
                            {option.label}
                        </Select.Option>
                    ))
                    : children}
            </SelectContent>
        </BaseSelect>
    );
};

Select.Option = ({ children, className, ...props }) => {
    return (
        <SelectItem className={className} {...props}>
            {children}
        </SelectItem>
    );
};
Select.Option.displayName = 'Select.Option';

export { Select };
