// This is a generated file, modify: generate/templates/templates/class_header.h

#ifndef GITCONFIGMAP_H
#define GITCONFIGMAP_H
#include <nan.h>
#include <string>
#include <queue>
#include <utility>
#include <unordered_map>
#include <sstream>

#include "async_baton.h"
#include "nodegit_wrapper.h"
#include "promise_completion.h"
#include "reference_counter.h"

extern "C" {
#include <git2.h>
}

#include "../include/typedefs.h"


using namespace node;
using namespace v8;

class GitConfigmap;

struct GitConfigmapTraits {
  typedef GitConfigmap cppClass;
  typedef git_configmap cType;

  static const bool isDuplicable = false;
  static void duplicate(git_configmap **dest, git_configmap *src) {
     Nan::ThrowError("duplicate called on GitConfigmap which cannot be duplicated");
   }

  static const bool isSingleton = false;
  static const bool isFreeable = true;
  static void free(git_configmap *raw) {
    unsigned long referenceCount = 0;
     if (referenceCount == 0) {
      ::free(raw); // :: to avoid calling this free recursively
    }
   }
};

class GitConfigmap : public
  NodeGitWrapper<GitConfigmapTraits>
{
    // grant full access to base class
    friend class NodeGitWrapper<GitConfigmapTraits>;
   public:
    static void InitializeComponent (v8::Local<v8::Object> target);

 

  private:
    GitConfigmap()
      : NodeGitWrapper<GitConfigmapTraits>(
           "A new GitConfigmap cannot be instantiated."
       )
    {}
    GitConfigmap(git_configmap *raw, bool selfFreeing, v8::Local<v8::Object> owner = v8::Local<v8::Object>())
      : NodeGitWrapper<GitConfigmapTraits>(raw, selfFreeing, owner)
    {}
    ~GitConfigmap();
     static NAN_METHOD(Type);
    static NAN_METHOD(StrMatch);
    static NAN_METHOD(MapValue);
};

#endif
