import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

interface Option {
  label: string;
  value: string | number;
}

interface FilterSelectorProps {
  title: string;
  icon: React.ReactNode;
  options: Option[];
  loading?: boolean;
  expanded: boolean;
  selected: string | undefined;
  onExpand: () => void;
  onSelect: (label: string) => void;
  emptyText?: string;
}

const FilterSelector: React.FC<FilterSelectorProps> = ({
  title,
  icon,
  options,
  loading,
  expanded,
  selected,
  onExpand,
  onSelect,
  emptyText,
}) => (
  <>
    <TouchableOpacity
      className="mt-5 flex-row items-center justify-between rounded-lg bg-[#2D81AD] p-3"
      onPress={onExpand}>
      <View className="flex-row items-center">
        {icon}
        <Text className="font-bold text-white ml-2">{title}</Text>
      </View>
      <MaterialIcons
        name={expanded ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
        size={16}
        color="white"
      />
    </TouchableOpacity>
    {expanded && (
      <View className="mt-2 rounded-lg bg-[#c2e4f4] p-2">
        {loading ? (
          <Text className="text-[#023146]">Cargando {title.toLowerCase()}...</Text>
        ) : options.length > 0 ? (
          options.map((opt) => (
            <TouchableOpacity
              key={opt.value.toString()}
              onPress={() => onSelect(opt.label)}
              className="mb-2 flex-row items-center">
              <View
                className={`h-5 w-5 rounded border border-gray-500 ${selected === opt.label ? 'bg-[#2D81AD]' : 'border-gray-500'}`}
              />
              <Text className="ml-2 text-[#023146]">{opt.label}</Text>
            </TouchableOpacity>
          ))
        ) : (
          <Text className="text-[#023146]">{emptyText || `No hay ${title.toLowerCase()} disponibles`}</Text>
        )}
      </View>
    )}
  </>
);

export default FilterSelector;