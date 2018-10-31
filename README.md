# Governor testing utility

## Usage
```
Usage: governor [options] <testfile>

Options:
  -V, --version  output the version number
  -h, --help     output usage information
```

## Testfile

The testfile must be in yaml format.

```yaml
binary: ../ueb01
tests:
  - name: Is prime 2
    args: 2 =
    output: 2 is a prime
  - name: Is not prime 4
    args: 4 =
    output: 4 is not a prime
```