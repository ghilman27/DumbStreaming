import random


def context(data):
    if isinstance(data, list):
        return len(data)
    else:
        return data


def partition3(data, left, right):
    pivot_data = data[left]
    left_part_idx = left
    final_pivot_idx = left

    for crnt_idx in range(left + 1, right + 1):
        if context(data[crnt_idx]) < context(pivot_data):
            left_part_idx += 1
            final_pivot_idx += 1
            data[crnt_idx], data[left_part_idx] = data[left_part_idx], data[crnt_idx]
            if final_pivot_idx != left_part_idx:
                data[crnt_idx], data[final_pivot_idx] = data[final_pivot_idx], data[crnt_idx]
                
        elif context(data[crnt_idx]) == context(pivot_data):
            final_pivot_idx += 1
            data[crnt_idx], data[final_pivot_idx] = data[final_pivot_idx], data[crnt_idx]
    
    data[left], data[final_pivot_idx] = data[final_pivot_idx], pivot_data
    if final_pivot_idx != left_part_idx:
        return left_part_idx, final_pivot_idx
        
    return None, final_pivot_idx


def quick_sort(data, left, right):
    if left >= right:
        return

    rand_pivot_idx = random.randint(left, right)
    data[left], data[rand_pivot_idx] = data[rand_pivot_idx], data[left]
    left_part_idx, final_pivot_idx = partition3(data, left, right)

    if left_part_idx is not None:
        quick_sort(data, left, left_part_idx)
    else:
        quick_sort(data, left, final_pivot_idx - 1)

    quick_sort(data, final_pivot_idx + 1, right)


def sort_arrays(arrays):
    quick_sort(arrays, 0, len(arrays) - 1)
    for array in arrays:
        quick_sort(array, 0, len(array) - 1)
    return arrays


if __name__ == '__main__':
    data = [
        ['g','h','i','j'],
        ['a','c','b','e','d'],
        ['g','e','f']
    ]
    print(sort_arrays(data))