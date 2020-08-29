import random
from string import ascii_lowercase, ascii_uppercase

NUMBER_CODES = [_ for _ in range(48,58)]
UPPERCASE_CODES = [_ for _ in range(65, 91)]
LOWERCASE_CODES = [_ for _ in range(97, 123)]
ASCII_NUMBERS = [*NUMBER_CODES, *UPPERCASE_CODES, *LOWERCASE_CODES]
CODE_LENGTH = 20
TOTAL_PARSER = 4
PARSER = '-'


def generate(n):
    result = []
    for _ in range(n):
        parsed_code = ''
        code = []
        idx = 0
        while idx <= CODE_LENGTH:
            if len(parsed_code) != 4:
                parsed_code += chr( ASCII_NUMBERS[ random.randint(0, len(ASCII_NUMBERS) - 1) ] )
            else:
                code.append(parsed_code)
                parsed_code = ''
            idx += 1
        result.append(PARSER.join(code))
    return result


if __name__ == '__main__':
    print(generate(3))