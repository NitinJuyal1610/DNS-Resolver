# Challenge 1 - wc tool

## Description

The WC tool is written typescript is the command line version of the UNIX commandline tool wc. The tool is used to count the number of words, lines, bytes and characters in a file/stdin.

## Usage

```shell
npm run build
node dist/script.js [options] filePath
```

The following options are supported:

- `-w`: prints the number of words in the file
- `-l`: prints the number of lines in the file
- `-c`: prints the number of bytes in the file
- `-m`: prints the number of characters in the file

The tool can also be used in stdin mode as follows:

- `cat filePath | node dist/script.js [option]`

## Stream-based Approach

I utilized a stream-based approach for processing files or standard input. This approach allows for efficient processing of large files by reading the input stream chunk by chunk instead of loading the entire file into memory at once.

By processing the stream in a sequential manner,it effectively counts the number of words, lines, bytes, and characters. This stream-based approach not only optimizes memory usage but also improves overall performance.
