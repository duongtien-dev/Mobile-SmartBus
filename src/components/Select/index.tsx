import {
    Select as BaseSelect,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import * as React from 'react';

type SelectProps = React.ComponentPropsWithoutRef<typeof BaseSelect> & {
    placeholder?: string;
    children: React.ReactNode;
    className?: string;
    triggerClassName?: string;
    contentClassName?: string;
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
                {children}
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
