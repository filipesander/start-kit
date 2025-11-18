<?php

namespace App\Resources\Laratables;

use Illuminate\Support\Str;

class Base
{
    /**
     * @param \Illuminate\Support\Collection $collection
     * @return \Illuminate\Support\Collection
     */
    public static function laratablesModifyCollection($collection)
    {
        return $collection;
    }

    /**
     * @param \Illuminate\Database\Eloquent\Builder
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public static function laratablesQueryConditions($query)
    {
        $query = static::applyColumnFilters($query);

        return $query;
    }

    public static function applyColumnFilters($query)
    {
        collect(request('columns'))
            ->filter(function ($column) {
                return $column['searchable'] === 'true'
                    && isset($column['search']['value']);
            })
            ->each(function ($column) use (&$query) {
                $columnName = $column['name'];
                $filterValue = $column['search']['value'];
                $operator = $column['search']['operator'] ?? null;

                if ($filterValue === 'all') {
                    return;
                }

                if ($methodName = static::hasCustomColumnFilter($columnName)) {
                    $query = get_called_class()::{$methodName}($query, $filterValue);
                } else {
                    switch ($operator) {
                        case 'equals':
                            $query = $query->where($columnName, $filterValue);
                            break;
                        case 'startsWith':
                            $query = $query->where($columnName, 'like', "{$filterValue}%");
                            break;
                        case 'endsWith':
                            $query = $query->where($columnName, 'like', "%{$filterValue}");
                            break;
                        case 'isEmpty':
                            $query = $query->where(function ($query) use ($columnName) {
                                $query->whereNull($columnName)
                                    ->orWhere($columnName, '');
                            });
                            break;
                        case 'isNotEmpty':
                            $query = $query->where(function ($query) use ($columnName) {
                                $query->whereNotNull($columnName)
                                    ->orWhere($columnName, '!=', '');
                            });
                            break;
                        default:
                            $query = $query->where($columnName, 'like', "%{$filterValue}%");
                    }
                }
            });

        return $query;
    }

    public static function hasCustomColumnFilter(string $columnName)
    {
        $methodName = Str::camel('laratables_filter_'.$columnName);

        if (method_exists(get_called_class(), $methodName)) {
            return $methodName;
        }

        return false;
    }

    /**
     * @param \Illuminate\Database\Eloquent\Model $model
     * @return string
     */
    public static function laratablesCustomActions($model)
    {
        return '';
    }
}
