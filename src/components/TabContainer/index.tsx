import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';

export type TabItem = {
    key: string;
    label: string;
};

type TabContainerProps = {
    tabs?: TabItem[];
    value?: string;
    onChange?: (value: string) => void;
    variant?: 'default' | 'underline';
    className?: string;
    tabListClassName?: string;
    triggerClassName?: string;
};

export default function TabContainer({
    tabs = [],
    value,
    onChange,
    variant = 'default',
    className,
    tabListClassName,
    triggerClassName,
}: TabContainerProps) {
    const isUnderline = variant === 'underline';

    if (!tabs.length) return null;

    return (
        <Tabs value={value} onValueChange={onChange} className={cn('w-full', className)}>
            <TabsList
                className={cn(
                    'h-auto w-full justify-start gap-1',
                    isUnderline && 'rounded-none bg-transparent p-0',
                    tabListClassName
                )}
            >
                {tabs.map((tab) => (
                    <TabsTrigger
                        key={tab.key}
                        value={tab.key}
                        className={cn(
                            'h-auto min-h-9 flex-none px-6 py-2 text-sm font-medium',
                            isUnderline
                                ? 'rounded-none border-b-2 border-transparent bg-transparent shadow-none data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none'
                                : 'px-10',
                            triggerClassName,
                        )}
                    >
                        {tab.label}
                    </TabsTrigger>
                ))}
            </TabsList>
        </Tabs>
    );
}
