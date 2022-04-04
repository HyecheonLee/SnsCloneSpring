import React, { useEffect } from "react";


interface IProps {
  eventUrl: string,
  events: Map<string, (data: any) => void>
}

const EventSourceHook: React.FC<IProps> = ({...props}) => {
  const {eventUrl, events} = props

  useEffect(() => {
    const source = eventSource()
    return () => {
      source.then(value => value.close());
    };
  }, []);


  async function eventSource() {
    const source: EventSource = await new EventSource(eventUrl, {withCredentials: true});

    source.onopen = (e) => {
      console.log('SSE opened!');
    }

    source.onmessage = (e) => {
      const result = JSON.parse(e.data);
      const event = events.get(result.type)
      if (event) {
        event((result.data))
      }
    }

    source.onerror = (e) => {
      source?.close();
    }

    return source;
  }

  return (<>
    {props.children}
  </>);
};

export default EventSourceHook;
