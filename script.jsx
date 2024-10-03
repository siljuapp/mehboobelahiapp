






//import React from 'react';
//import ReactDOM from 'react-dom';


function loadHTMLpage(){
  return (
    <div className="container-inner">
      <div className= {`tabs flex justify-center align-middle gap-4 px-4 py-4 border-b-2`}>
        <div className="tab home">Home</div> 
        <div className="tab mcq">MCQ</div>
        <div className="tab notes">Notes</div>
        <div className="tab mock">Mock</div>
        <div className="tab user">User</div>
      </div>

      <div className="tab-containers">
        
      </div>


    </div>
  )
} 



function loadTabs(tab_index) {
  var container = document.querySelector(".container");



  ReactDOM.render(
    <div className="container">
      {/* Tabs Navigation */}
      <div className="tabs flex justify-center align-middle gap-4 px-4 py-4 border-b-2">
        <div
          className= {`tab home ${tab_index === 1 ? 'text-blue-500 border-b-blue-400' : 'text-gray-600'} cursor-pointer`}
          onClick={() => loadTabs(1)}
        >
          Home
        </div>

        <div
          className={`tab mcq ${tab_index === 2 ? 'text-blue-500 border-b-blue-400' : 'text-gray-600'} cursor-pointer`}
          onClick={() => loadTabs(2)}
        >
          MCQ
        </div>
      </div>

      {/* Tab Content */}
      <div className="tab-container  flex-col  align-middle px-5 py-5">
        {/* Home Page */}
        <div className={`page home ${tab_index === 1 ? '' : 'hide'}`}>
          <span>THIS IS HOME PAGE</span>
        </div>

        {/* MCQ Page */}
        <div className={`page mcq ${tab_index === 2 ? '' : 'hide'}`}>
          <span>THIS IS MCQ PAGE</span>
        </div>
      </div>
    </div>,

    container
  );
}

// Load the first tab by default
loadTabs(1);


const TabsComponent = () => {
  // State to manage active tab
  const [activeTab, setActiveTab] = useState(1);

  // Tabs switch function
  const switchTab = (tabIndex) => {
    setActiveTab(tabIndex);
  };

  return (
    <div className="container mx-auto p-6">
      {/* Tabs Header */}
      <header className="flex space-x-4 justify-center border-b-2">
        <button
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === 1
              ? "text-blue-500 border-b-4 border-blue-500"
              : "text-gray-500"
          }`}
          onClick={() => switchTab(1)}
        >
          Tab 1
        </button>
        <button
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === 2
              ? "text-blue-500 border-b-4 border-blue-500"
              : "text-gray-500"
          }`}
          onClick={() => switchTab(2)}
        >
          Tab 2
        </button>
        <button
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === 3
              ? "text-blue-500 border-b-4 border-blue-500"
              : "text-gray-500"
          }`}
          onClick={() => switchTab(3)}
        >
          Tab 3
        </button>
      </header>

      {/* Tab Content */}
      <div className="p-4">
        {activeTab === 1 && (
          <div className="text-center text-lg">Content for Tab 1</div>
        )}
        {activeTab === 2 && (
          <div className="text-center text-lg">Content for Tab 2</div>
        )}
        {activeTab === 3 && (
          <div className="text-center text-lg">Content for Tab 3</div>
        )}
      </div>
    </div>
  );
};

function openPage(tab) {}

//export default TabsComponent;
