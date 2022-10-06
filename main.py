def main():
    from server import createApp

    app = createApp()

    app.run(host="127.0.0.1", port="5000", debug=True)


if __name__ == "__main__":
    main()
