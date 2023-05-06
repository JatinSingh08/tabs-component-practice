import React, {useEffect, useState} from 'react';

const items = [
  {
    title: 'Item One',
    content: 'Content 1'
  },
  {
    title: 'Item Two',
    content: 'Content 2'
  },
  {
    title: 'Item Three',
    content: 'Content 3'
  }
]
const Tabs = () => {
  
  const [activeTab, setActiveTab] = useState<number>(0);
  const [content ,setContent] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

 
  useEffect(() => {
    setIsLoading(true);
    setContent("");
    
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchData = async () => {

      setTimeout(async () => {

        const response = await fetch(
          `https://jsonplaceholder.typicode.com/posts/${activeTab + 1}`
        , {signal});
        const data = await response.json();
        setIsLoading(false);
        setContent(data.body);

      }, 1000);

    };
    fetchData();

    return () => {
      controller.abort(); // cleanup 
    }

  }, [activeTab]);

  return (
    <div className="tabs__container">
      <div className='tabs__button'>
        {
          items.map((item, idx) => {
          return (
            <button
            onClick={() => {
              setActiveTab(idx);
            }}
            className={idx === activeTab ? 'tab active' : 'tab'}
            >{item.title}</button>
          )})
        }
        
      </div>
       <div className="tabs__content">
        {
          isLoading ? (
          <>
          <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '6rem',
            width: '100%',
          }}
          >
            <div className="loader"></div>
          </div>
          </>
          )
          : (
            <>
              <b>{items[activeTab].title}: </b>
              {
                isLoading === false && content
              }
            </>
            )
        }
      </div>
    </div>
  )
}

export default Tabs