// This is a generated file, modify: generate/templates/templates/class_content.cc

#include <nan.h>
#include <string.h>

extern "C" {
  #include <git2.h>
 }

#include "../include/nodegit.h"
#include "../include/lock_master.h"
#include "../include/functions/copy.h"
#include "../include/configmap.h"
#include "nodegit_wrapper.cc"
#include "../include/async_libgit2_queue_worker.h"

 
#include <iostream>

using namespace std;
using namespace v8;
using namespace node;

  GitConfigmap::~GitConfigmap() {
    // this will cause an error if you have a non-self-freeing object that also needs
    // to save values. Since the object that will eventually free the object has no
    // way of knowing to free these values.
   }

  void GitConfigmap::InitializeComponent(v8::Local<v8::Object> target) {
    Nan::HandleScope scope;

    v8::Local<FunctionTemplate> tpl = Nan::New<FunctionTemplate>(JSNewFunction);

    tpl->InstanceTemplate()->SetInternalFieldCount(1);
    tpl->SetClassName(Nan::New("Configmap").ToLocalChecked());

         Nan::SetPrototypeMethod(tpl, "type", Type);
         Nan::SetPrototypeMethod(tpl, "strMatch", StrMatch);
         Nan::SetPrototypeMethod(tpl, "mapValue", MapValue);
  
    InitializeTemplate(tpl);

    v8::Local<Function> _constructor_template = Nan::GetFunction(tpl).ToLocalChecked();
    constructor_template.Reset(_constructor_template);
    Nan::Set(target, Nan::New("Configmap").ToLocalChecked(), _constructor_template);
  }

      // start field block
    NAN_METHOD(GitConfigmap::Type) {
      v8::Local<v8::Value> to;

            git_configmap_t
           type =
          Nan::ObjectWrap::Unwrap<GitConfigmap>(info.This())->GetValue()->type;
 // start convert_to_v8 block
     to = Nan::New<Number>( type);
  // end convert_to_v8 block
      info.GetReturnValue().Set(to);
    }
    // end field block
     // start field block
    NAN_METHOD(GitConfigmap::StrMatch) {
      v8::Local<v8::Value> to;

            const char *
           str_match =
          Nan::ObjectWrap::Unwrap<GitConfigmap>(info.This())->GetValue()->str_match;
 // start convert_to_v8 block
  if (str_match){
       to = Nan::New<v8::String>(str_match).ToLocalChecked();
   }
  else {
    to = Nan::Null();
  }

  // end convert_to_v8 block
      info.GetReturnValue().Set(to);
    }
    // end field block
     // start field block
    NAN_METHOD(GitConfigmap::MapValue) {
      v8::Local<v8::Value> to;

            int
           map_value =
          Nan::ObjectWrap::Unwrap<GitConfigmap>(info.This())->GetValue()->map_value;
 // start convert_to_v8 block
     to = Nan::New<Number>( map_value);
  // end convert_to_v8 block
      info.GetReturnValue().Set(to);
    }
    // end field block
  // force base class template instantiation, to make sure we get all the
// methods, statics, etc.
template class NodeGitWrapper<GitConfigmapTraits>;
 