
import string

# A small sample list of very common passwords
COMMON_PASSWORDS = {
    "password", "123456", "12345678", "98765432", "abc123",
    "password1", "Exam", "admin", "welcome", "Student",
    "School", "Rupali", "111111", "123123", "Import",
}


def check_length(password):
    
    length = len(password)
    if length < 8:
        return 0
    elif length < 12:
        return 1
    elif length < 16:
        return 2
    return 3


def check_character_types(password):
    
    has_lower = any(c in string.ascii_lowercase for c in password)
    has_upper = any(c in string.ascii_uppercase for c in password)
    has_digit = any(c in string.digits for c in password)
    has_symbol = any(c in string.punctuation for c in password)

    missing = []
    if not has_lower:
        missing.append("lowercase letters")
    if not has_upper:
        missing.append("uppercase letters")
    if not has_digit:
        missing.append("numbers")
    if not has_symbol:
        missing.append("special characters (!@#$%)")

    types_used = 4 - len(missing)
    return types_used, missing


def is_common_password(password):
   
    return password.lower() in COMMON_PASSWORDS


def has_repeated_pattern(password):
  
    # Three or more identical characters in a row
    for i in range(len(password) - 2):
        if password[i] == password[i + 1] == password[i + 2]:
            return True
    # Simple ascending sequences like 123 or abc
    for i in range(len(password) - 2):
        a, b, c = ord(password[i]), ord(password[i + 1]), ord(password[i + 2])
        if b == a + 1 and c == b + 1:
            return True
    return False


def evaluate_password(password):
    """Combine all checks into a score, rating and list of tips."""
    tips = []

    # Common passwords are always weak, no matter what else is true
    if is_common_password(password):
        return 0, "Weak", ["This is a very common password. Attackers try these first."]

    score = check_length(password)                      # 0-3
    types_used, missing = check_character_types(password)
    score += types_used                                 # 0-4

    if has_repeated_pattern(password):
        score -= 2
        tips.append("Avoid repeated characters or sequences like 'aaa' or '123'.")

    if len(password) < 12:
        tips.append("Use at least 12 characters. Longer is stronger.")
    if missing:
        tips.append("Add " + ", ".join(missing) + ".")

    score = max(score, 0)  # never go below 0

    # Maximum possible score is 7
    if score <= 3:
        rating = "Weak"
    elif score <= 5:
        rating = "Medium"
    else:
        rating = "Strong"

    return score, rating, tips


def main():
    print("=== Password Strength Checker ===")
    print("Type 'quit' to exit.\n")

    while True:
        password = input("Enter a password: ")
        if password.lower() == "quit":
            print("Goodbye!")
            break
        if password == "":
            print("Please enter a password.\n")
            continue

        score, rating, tips = evaluate_password(password)
        print(f"\nScore: {score}/7")
        print(f"Rating: {rating}")
        if tips:
            print("Tips to improve:")
            for tip in tips:
                print(" -", tip)
        else:
            print("Great password! No improvements needed.")
        print()


if __name__ == "__main__":
    main()