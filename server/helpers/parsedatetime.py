import datetime

def parse_datetime(datetime_str):
    if datetime_str is None:
        return None
    if "." in datetime_str:
        datetime_str = datetime_str.split(".")[0]
    return datetime.datetime.strptime(datetime_str, "%Y-%m-%dT%H:%M:%S")

def stringify_datetime(datetime):
    if datetime is None:
        return None
    return datetime.strftime("%Y-%m-%dT%H:%M:%S")