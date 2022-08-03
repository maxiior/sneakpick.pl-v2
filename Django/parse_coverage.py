FILENAME_INPUT = "coverage.txt"
FILENAME_OUTPUT = "coverage_md.txt"

tests = []
last_line = None

with open(FILENAME_INPUT) as f:
    content = f.read().splitlines()
    last_line = content[-1]
    for line in content[2:-2]:
        tests.append(line)

with open(FILENAME_OUTPUT, "w") as f:

    f.write("# Django tests coverage report" + "\n" + "\n")
    f.write("| Name | Statements | Missing | Coverage |" + "\n")
    f.write("| --- | --- | --- | --- |" + "\n")
    for line in tests:
        line_content = "|"
        for x in line.split(" "):
            if x:
                x = x.replace("_", "\_")
                line_content = line_content + f" {x} " + "|"
        f.write(line_content + "\n")

    line_content = "|"
    for x in last_line.split(" "): 
        if x:
            line_content = line_content + f" **{x}** " + "|"
    
    f.write(line_content + "\n")