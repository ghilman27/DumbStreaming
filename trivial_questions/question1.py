""" Time Complexity: O(n^2) """
def count_handshake(num_people):
    handshake_count = 0
    for first_person in range(num_people):
        for _ in range(first_person+1, num_people):
            handshake_count += 1
    return handshake_count

if __name__ == '__main__':
    print(count_handshake(4))